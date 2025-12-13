"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NethernetSignal = void 0;
const atomic_net_1 = require("atomic-net");
const node_events_1 = require("node:events");
const ws_1 = require("ws");
const config_1 = require("../config/config");
const logger_1 = require("../utils/logger");
const MessageType = {
    RequestPing: 0,
    Signal: 1,
    Credentials: 2
};
class NethernetSignal extends node_events_1.EventEmitter {
    constructor(networkId, authflow, version) {
        super();
        this.ws = null;
        this.credentials = [];
        this.heartbeat = null;
        this.destroyed = false;
        this.networkId = networkId;
        this.auth = authflow;
        this.version = version;
    }
    async connect() {
        if (this.ws?.readyState === ws_1.WebSocket.OPEN)
            throw new Error('Already connected signaling server');
        this.destroyed = false;
        await this.init();
        await Promise.race([
            (0, node_events_1.once)(this, "credentials"),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timed out waiting for credentials")), 15000))
        ]);
        //Added Heartbeat to keep the client connected
        this.heartbeat = setInterval(() => {
            this.ws?.send(JSON.stringify({ Type: MessageType.RequestPing }));
        }, 40000);
    }
    async destroy() {
        logger_1.Logger.debug('Disconnecting from Signal', config_1.config.debug);
        this.destroyed = true;
        const ws = this.ws;
        this.ws = null;
        if (ws) {
            // Remove listeners to avoid leaks
            ws.removeAllListeners("open");
            ws.removeAllListeners("close");
            ws.removeAllListeners("error");
            ws.removeAllListeners("message");
            if (ws.readyState === ws_1.WebSocket.OPEN || ws.readyState === ws_1.WebSocket.CONNECTING) {
                await new Promise((resolve) => {
                    const done = () => resolve();
                    ws.once("close", done);
                    try {
                        ws.close(1000, "Normal Closure");
                    }
                    catch {
                        resolve();
                    }
                });
            }
        }
        if (this.heartbeat) {
            clearInterval(this.heartbeat);
            this.heartbeat = null;
        }
        //Stop Heartbeat on destroy
        if (this.heartbeat) {
            clearInterval(this.heartbeat);
            this.heartbeat = null;
        }
    }
    async init() {
        const flow = this.auth;
        const usesAuthflow = typeof flow?.getMinecraftBedrockServicesToken === "function";
        const mcToken = usesAuthflow
            ? (await flow.getMinecraftBedrockServicesToken({ version: this.version })).mcToken
            : flow.mcToken?.token ?? flow.mcToken;
        logger_1.Logger.debug('Fetched XBL Token', config_1.config.debug);
        const address = `wss://signal.franchise.minecraft-services.net/ws/v1.0/signaling/${this.networkId}`;
        logger_1.Logger.debug(`Connecting to Signal ${address}`, config_1.config.debug);
        const ws = new ws_1.WebSocket(address, { headers: { Authorization: mcToken } });
        this.ws = ws;
        ws.on("open", () => this.onOpen());
        ws.on("close", (code, reason) => this.onClose(code, reason.toString()));
        ws.on("error", (err) => this.onError(err));
        ws.on("message", (data) => this.onMessage(data));
    }
    onOpen() {
        logger_1.Logger.debug("Connected to Signal", config_1.config.debug);
    }
    onError(err) {
        logger_1.Logger.debug(`Signal Error: ${JSON.stringify(err, null, 2)}`, config_1.config.debug);
    }
    async onClose(code, reason) {
        logger_1.Logger.debug(`Signal Disconnected code=${code} reason=${reason}`, config_1.config.debug);
        if (this.destroyed)
            return;
        await this.destroy();
        this.emit("error", new Error(`Signal closed: ${code} ${reason}`));
    }
    onMessage(res) {
        let message = null;
        if (typeof res === "string") {
            try {
                message = JSON.parse(res);
            }
            catch (e) {
                logger_1.Logger.debug(`Failed to parse message: ${String(e)}`, config_1.config.debug);
                return;
            }
        }
        else if (res instanceof Buffer) {
            try {
                message = JSON.parse(res.toString("utf8"));
            }
            catch (e) {
                logger_1.Logger.debug(`Failed to parse binary message: ${String(e)}`, config_1.config.debug);
                return;
            }
        }
        else {
            logger_1.Logger.debug(`Received non-text message ${typeof res}`, config_1.config.debug);
            return;
        }
        logger_1.Logger.debug(`Received message ${JSON.stringify(message)}`, config_1.config.debug);
        switch (message.Type) {
            case MessageType.Credentials: {
                if (message.From !== "Server") {
                    logger_1.Logger.debug(`Ignoring credentials from non-Server ${JSON.stringify(message)}`, config_1.config.debug);
                    return;
                }
                this.credentials = parseTurnServers(message.Message);
                this.emit("credentials", this.credentials);
                break;
            }
            case MessageType.Signal: {
                const m = message;
                try {
                    const signal = atomic_net_1.SignalStructure.fromString(m.Message);
                    signal.networkId = m.From;
                    this.emit("signal", signal);
                }
                catch (e) {
                    logger_1.Logger.debug(`Failed to parse Signal: ${String(e)}`, config_1.config.debug);
                }
                break;
            }
            case MessageType.RequestPing: {
                try {
                    this.ws?.send(JSON.stringify({ Type: MessageType.RequestPing }));
                }
                catch { }
                break;
            }
            default:
                break;
        }
    }
    write(signal) {
        if (!this.ws)
            throw new Error('WebSocket not connected');
        const message = JSON.stringify({
            Type: MessageType.Signal,
            To: signal.networkId,
            Message: signal.toString()
        });
        logger_1.Logger.debug(`Sending Signal ${message}`, config_1.config.debug);
        this.ws.send(message);
    }
}
exports.NethernetSignal = NethernetSignal;
function parseTurnServers(dataString) {
    const iceServers = [];
    try {
        const data = JSON.parse(dataString);
        logger_1.Logger.debug("Parsed Turn Servers payload", config_1.config.debug);
        const list = Array.isArray(data?.TurnAuthServers) ? data.TurnAuthServers : [];
        for (const server of list) {
            const urls = Array.isArray(server?.Urls) ? server.Urls : [];
            const username = typeof server?.Username === "string" ? server.Username : undefined;
            const password = typeof server?.Password === "string"
                ? server.Password
                : (typeof server?.Credential === "string" ? server.Credential : undefined);
            for (const rawUrl of urls) {
                if (typeof rawUrl !== "string")
                    continue;
                const parsed = parseIceUrl(rawUrl);
                if (!parsed)
                    continue;
                const candidates = new Set();
                candidates.add(formatIceUrl(parsed));
                if (parsed.isTurn) {
                    if (parsed.transport !== "tcp") {
                        candidates.add(formatIceUrl({ ...parsed, transport: "tcp" }));
                    }
                    if (parsed.scheme !== "turns") {
                        candidates.add(formatIceUrl({ ...parsed, scheme: "turns", port: 5349, transport: "tcp" }));
                    }
                }
                for (const url of candidates) {
                    if (parsed.isTurn) {
                        iceServers.push({
                            urls: url,
                            username,
                            credential: password
                        });
                    }
                    else {
                        iceServers.push({ urls: url });
                    }
                }
            }
        }
    }
    catch (e) {
        logger_1.Logger.debug(`Failed to parse TURN servers: ${String(e)}`, config_1.config.debug);
    }
    return iceServers;
}
function parseIceUrl(url) {
    const match = url.trim().match(/^(?<scheme>stuns?|turns?)(?::\/\/|:)?(?<host>[^:?\s]+)(?::(?<port>\d+))?(?:\?(?<query>.*))?$/i);
    if (!match || !match.groups) {
        return null;
    }
    const scheme = match.groups.scheme.toLowerCase();
    const hostname = match.groups.host;
    const port = match.groups.port ? parseInt(match.groups.port, 10) : defaultPortForScheme(scheme);
    if (!hostname || Number.isNaN(port)) {
        return null;
    }
    const isTurn = scheme.startsWith("turn");
    let transport;
    if (scheme === "turns") {
        transport = "tcp";
    }
    if (isTurn) {
        const params = new URLSearchParams(match.groups.query ?? "");
        const requested = params.get("transport")?.toLowerCase();
        if (requested === "tcp") {
            transport = "tcp";
        }
        else if (!transport) {
            transport = "udp";
        }
    }
    return { scheme, hostname, port, transport, isTurn };
}
function formatIceUrl(parsed) {
    const protocol = parsed.scheme;
    const base = `${protocol}:${parsed.hostname}:${parsed.port}`;
    if (!parsed.isTurn) {
        return base;
    }
    const transport = parsed.transport ?? "udp";
    return `${base}?transport=${transport}`;
}
function defaultPortForScheme(scheme) {
    switch (scheme) {
        case "stuns":
        case "turns":
            return 5349;
        default:
            return 3478;
    }
}
