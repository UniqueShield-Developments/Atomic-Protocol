"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const assert_1 = __importDefault(require("assert"));
const auth_1 = require("./client/auth");
const client_1 = require("./client/client");
const config_1 = require("./config/config");
const nethernet_1 = require("./nethernet");
const rak_1 = require("./rak");
const convert_1 = require("./utils/convert");
const errors_js_1 = require("./utils/errors.js");
const logger_1 = require("./utils/logger");
const utilities_1 = require("./utils/utilities");
const signal_1 = require("./websocket/signal");
const createClient = (options) => {
    (0, assert_1.default)(options);
    const transport = options.networkId !== undefined ? "nethernet" : (options.host || options.port) ? "raknet" : options.transport ?? "raknet";
    if (!options.realmId) {
        if (transport === "raknet" && !options.host) {
            throw new errors_js_1.AtomicError("CREATION_FAILED", "'host' is required when connecting over RakNet without a realmId");
        }
        if (transport === "nethernet" && options.networkId === undefined) {
            throw new errors_js_1.AtomicError("CREATION_FAILED", "'networkId' is required when connecting over Nethernet without a realmId");
        }
    }
    const client = new client_1.Client({
        port: 19132,
        delayedInit: true,
        followPort: !options.realmId,
        protocolVersion: config_1.config.protocol,
        version: config_1.config.minecraftVersion,
        transport,
        ...options
    });
    config_1.config.debug = options.debug ?? false;
    if (options.realmId)
        (0, auth_1.realmAuth)(client.options).then(onServerInfo).catch((e) => client.emit('error', e));
    else
        onServerInfo();
    function onServerInfo() {
        client.on("connect_allowed", () => connect(client));
        if (options.skipPing)
            client.init();
        else {
            ping({ host: client.options.host, networkId: client.options.networkId, port: client.options.port, timeout: options.connectTimeout }).then((ad) => {
                if (client.options.transport === "nethernet")
                    return client.init();
                if (ad.portV4 && client.options.followPort)
                    client.options.port = ad.portV4;
                logger_1.Logger.debug(`Connecting to ${client.options.host}:${client.options.port} ${ad.motd} (${ad.levelName}), version ${ad.version} ${config_1.config.minecraftVersion}`, config_1.config.debug);
                client.init();
            }).catch((e) => {
                if (!client.options.useSignalling) {
                    client.emit("error", e);
                }
                else {
                    logger_1.Logger.debug("Could not ping server through local signalling, trying to connect over franchise signally instead", config_1.config.debug);
                    client.init();
                }
            });
        }
    }
    return client;
};
exports.createClient = createClient;
async function connect(client) {
    if (client.options.transport === "nethernet") {
        if (client.options.useSignalling) {
            client.nethernet = {};
            client.nethernet.signalling = new signal_1.NethernetSignal(
            //@ts-ignore
            client.connection.nethernet.networkId, client.options.authflow, client.options.version);
            //@ts-ignore
            await client.nethernet.signalling.connect();
            //@ts-ignore
            client.connection.nethernet.credentials = client.nethernet.signalling.credentials;
            //@ts-ignore
            client.connection.nethernet.signalHandler = client.nethernet.signalling.write.bind(client.nethernet.signalling);
            //@ts-ignore
            client.nethernet.signalling.on('signal', signal => client.connection.nethernet.handleSignal(signal));
        }
        else {
            await client.connection.ping();
        }
    }
    client.connect();
    client.once("resource_packs_info", () => {
        client.write('resource_pack_client_response', {
            response_status: 'completed',
            resourcepackids: []
        });
        client.once('resource_pack_stack', () => {
            client.write('resource_pack_client_response', {
                response_status: 'completed',
                resourcepackids: []
            });
        });
        client.queue('client_cache_status', { enabled: false });
        (0, utilities_1.sleep)(500).then(() => {
            client.queue('request_chunk_radius', { chunk_radius: 1, max_radius: 10 });
        });
    });
}
async function ping({ host, port, networkId, timeout }) {
    if (networkId) {
        const con = new nethernet_1.NethernetClient({ networkId });
        try {
            //@ts-ignore
            return nethernetConvert(Buffer.from(await con.ping()));
        }
        finally {
            con.close();
        }
    }
    const con = new rak_1.RaknetClient({ host, port });
    try {
        const value = await con.ping(timeout);
        const serverInfo = (0, convert_1.convert)(value);
        return serverInfo;
    }
    finally {
        con.close();
    }
}
