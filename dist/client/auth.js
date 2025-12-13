"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.realmAuth = exports.AuthenticationType = void 0;
exports.OptIn = OptIn;
const config_1 = require("../config/config");
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
var AuthenticationType;
(function (AuthenticationType) {
    AuthenticationType[AuthenticationType["Full"] = 0] = "Full";
    AuthenticationType[AuthenticationType["Guest"] = 1] = "Guest";
    AuthenticationType[AuthenticationType["SelfSigned"] = 2] = "SelfSigned";
})(AuthenticationType || (exports.AuthenticationType = AuthenticationType = {}));
const realmAuth = async (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conditional auth token acquisition
            const authflow = options.authflow;
            const usesAuthflow = typeof authflow?.getXboxToken === "function";
            const auth = usesAuthflow
                ? await authflow.getXboxToken(config_1.config.parties.realm, true)
                : authflow.realms ?? authflow;
            if (!auth?.XSTSToken || !auth?.userHash)
                throw errors_1.Errors.noTokens();
            if (options.inviteCode)
                await acceptInvite(options.inviteCode);
            await OptIn(options);
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            const getAddress = async (realmId) => {
                const attempts = options.retryOnUnavailableRealm ? 2 : 1;
                const delay = options.unavailableRealmRetryDelay ?? 20000;
                for (let attempt = 1; attempt <= attempts; attempt++) {
                    logger_1.Logger.debug(`Fetching realm: ${realmId}'s address (attempt ${attempt})`, options.debug);
                    const fetchResponse = await fetch(config_1.config.endpoints.address(realmId), {
                        method: "GET",
                        headers: {
                            Authorization: `XBL3.0 x=${auth.userHash};${auth.XSTSToken}`,
                            ...config_1.config.realmHeaders
                        }
                    });
                    if (fetchResponse.ok) {
                        const json = await fetchResponse.json();
                        if (json.networkProtocol === "NETHERNET") {
                            return json.address;
                        }
                        const [host, port] = json?.address?.split(":");
                        return { host, port };
                    }
                    if (fetchResponse.status === 503 && attempt < attempts) {
                        logger_1.Logger.debug(`Realm unavailable, retrying in ${delay}ms`, options.debug);
                        await sleep(delay);
                        continue;
                    }
                    throw errors_1.Errors.noRealm(fetchResponse.status, fetchResponse.statusText);
                }
            };
            async function acceptInvite(code) {
                const fetchResponse = await fetch(config_1.config.endpoints.acceptInvite(code), {
                    method: "POST",
                    headers: {
                        Authorization: `XBL3.0 x=${auth.userHash};${auth.XSTSToken}`,
                        ...config_1.config.realmHeaders
                    }
                });
                if (!fetchResponse.ok)
                    throw errors_1.Errors.inviteFailed();
            }
            const address = await getAddress(options.realmId);
            if (!address)
                return; //Added return before deconstruct | Better Error Catching
            if (address?.host && address?.port) {
                const { host, port } = address;
                if (!host || !port)
                    throw errors_1.Errors.noRealm(404, "Not found");
                options.host = host;
                options.port = Number(port);
                options.transport = "raknet";
                resolve(null);
            }
            else {
                options.networkId = address;
                options.useSignalling = true;
                options.transport = "nethernet";
                resolve(null);
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
        ;
    });
};
exports.realmAuth = realmAuth;
const authenticate = async (client, options) => {
    try {
        const authflow = options.authflow;
        const usesAuthflow = typeof authflow?.getMinecraftBedrockToken === "function";
        let chains;
        if (usesAuthflow) {
            //@ts-ignore
            chains = chains = await authflow.getMinecraftBedrockToken(client.clientX509).catch((e) => {
                throw e;
            });
        }
        else {
            const response = await fetch(config_1.config.endpoints.authenticate, {
                method: "POST",
                headers: {
                    ...config_1.config.realmHeaders,
                    Authorization: `XBL3.0 x=${authflow.bedrock.userHash};${authflow.bedrock.XSTSToken}`
                },
                //@ts-ignore
                body: JSON.stringify({ clientX509: client.clientX509 })
            });
            if (!response.ok)
                throw errors_1.Errors.noTokens();
        }
        const jwt = chains[1];
        const [_, payload, __] = jwt.split('.').map((k) => Buffer.from(k, 'base64'));
        const xboxProfile = JSON.parse(String(payload));
        const profile = {
            name: xboxProfile?.extraData?.displayName || 'Atomic Client',
            uuid: xboxProfile?.extraData?.identity || "dfcf5ca-206c-404a-aec4-f59fff264c9b",
            xuid: xboxProfile?.extraData?.XUID || 0
        };
        return postAuthenticate(client, profile, chains);
    }
    catch (e) {
        console.error(e);
        client.emit('error', e);
    }
};
exports.authenticate = authenticate;
function postAuthenticate(client, profile, chains) {
    client.profile = profile;
    client.username = profile.name;
    client.accessToken = chains;
    client.emit('session');
}
/**
 * Opts the player into realm story features for the given realm
 * @param options Contains the authflow/token data and the target `realmId`.
 * @returns Promise with request outcome, including status code and optional response body when failed.
 */
async function OptIn(options) {
    //Conditional auth token acquisition
    const authflow = options.authflow;
    const usesAuthflow = typeof authflow?.getXboxToken === "function";
    const auth = usesAuthflow
        ? await authflow.getXboxToken(config_1.config.parties.realm, true)
        : authflow.realms ?? { ...options.authflow };
    if (!auth.XSTSToken || !auth.userHash)
        throw errors_1.Errors.noTokens();
    let attempt = 0;
    while (true) {
        attempt++;
        const ctrl = new AbortController();
        const to = setTimeout(() => ctrl.abort(), 10 * 1000);
        let resp;
        try {
            resp = await fetch(`https://bedrock.frontendlegacy.realms.minecraft-services.net/worlds/${options.realmId}/stories/settings`, {
                method: "POST",
                headers: {
                    ...config_1.config.realmHeaders,
                    Authorization: `XBL3.0 x=${auth.userHash};${auth.XSTSToken}`,
                },
                body: JSON.stringify({
                    autostories: true,
                    coordinates: false,
                    notifications: false,
                    optInRequired: true,
                    playerOptIn: "OPT_IN",
                    realmOptIn: "OPT_IN",
                    timeline: true,
                }),
                signal: ctrl.signal
            });
        }
        catch (err) {
            clearTimeout(to);
            if (err?.name === "AbortError" && attempt <= 2 + 1) {
                await new Promise(r => setTimeout(r, 250 + (attempt - 1) * (attempt - 1) * 250));
                continue;
            }
            throw err;
        }
        finally {
            clearTimeout(to);
        }
        if (resp.status === 204)
            return { ok: true, status: 204 };
        if ((resp.status === 429 || (resp.status >= 500 && resp.status <= 599)) && attempt <= 2 + 1) {
            await new Promise(r => setTimeout(r, 250 + (attempt - 1) * (attempt - 1) * 250));
            continue;
        }
        let text;
        try {
            text = await resp.text();
        }
        catch { }
        return { ok: false, status: resp.status, body: text };
    }
}
