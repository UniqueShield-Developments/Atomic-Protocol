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
            const token = options.tokens.realms;
            if (options.inviteCode)
                await acceptInvite(options.inviteCode);
            await OptIn(options);
            const getAddress = async (realmId) => {
                logger_1.Logger.debug(`Fetching realm: ${realmId}'s address`, options.debug);
                const fetchResponse = await fetch(config_1.config.endpoints.address(realmId), {
                    method: "GET",
                    headers: {
                        Authorization: `XBL3.0 x=${token.userHash};${token.XSTSToken}`,
                        ...config_1.config.realmHeaders
                    }
                });
                if (!fetchResponse.ok)
                    throw errors_1.Errors.noRealm(fetchResponse.status, fetchResponse.statusText);
                const json = await fetchResponse.json();
                if (json.networkProtocol === "NETHERNET") {
                    return json.address;
                }
                const [host, port] = json?.address?.split(":");
                return { host, port };
            };
            async function acceptInvite(code) {
                const fetchResponse = await fetch(config_1.config.endpoints.acceptInvite(code), {
                    method: "POST",
                    headers: {
                        Authorization: `XBL3.0 x=${token.userHash};${token.XSTSToken}`,
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
        const token = options.tokens.bedrock;
        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'MCPE/UWP',
            Authorization: `XBL3.0 x=${token.userHash};${token.XSTSToken}`
        };
        const response = await fetch("https://multiplayer.minecraft.net/authentication", {
            method: 'POST',
            headers,
            //@ts-ignore
            body: JSON.stringify({ identityPublicKey: client.clientX509 })
        });
        const { chain: chains } = await response.json();
        //@ts-ignore
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
async function OptIn(options) {
    const tokens = options.tokens.realms;
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
                    Authorization: `XBL3.0 x=${tokens.userHash};${tokens.XSTSToken}`,
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
