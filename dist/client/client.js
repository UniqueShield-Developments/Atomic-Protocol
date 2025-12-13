"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const config_1 = require("../config/config");
const keyExchange_1 = require("../handshake/keyExchange");
const login_1 = __importDefault(require("../handshake/login"));
const loginVerify_1 = __importDefault(require("../handshake/loginVerify"));
const nethernet_1 = require("../nethernet");
const rak_1 = require("../rak");
const serializer_1 = require("../transforms/serializer");
const types_1 = require("../types");
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const auth_1 = require("./auth");
const connection_1 = require("./connection");
class Client extends connection_1.Connection {
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    constructor(options) {
        super();
        this.tick = 0n;
        this.viewDistance = 10;
        this.networkSettingsRequested = false;
        this.onEncapsulated = (encapsulated, _inetAddr) => {
            const buffer = Buffer.from(encapsulated.buffer);
            process.nextTick(() => this.handle(buffer));
        };
        this._connect = async () => {
            this.connection.onConnected = () => {
                this.setStatus(types_1.clientStatus.Connecting);
                if (!this.networkSettingsRequested) {
                    this.networkSettingsRequested = true;
                    this.queue('request_network_settings', { client_protocol: Number(this.options.protocolVersion) });
                }
            };
            this.connection.onCloseConnection = (reason) => {
                logger_1.Logger.debug(`Server closed connection: ${reason}`, this.status === types_1.clientStatus.Disconnected && config_1.config.debug);
                // if (!wasManual && this.autoReconnect) {
                //     const delay = Math.min(30000, 2000 * Math.max(1, ++this.reconnectAttempts));
                //     Logger.debug(`Scheduling Nethernet reconnect in ${delay}ms`);
                //     this.scheduleReconnect(delay);
                // }
            };
            this.connection.onEncapsulated = this.onEncapsulated;
            this.connection.connect();
            this.connectTimeout = setTimeout(() => {
                if (this.status === types_1.clientStatus.Disconnected) {
                    this.connection.close();
                    this.emit('error', Error('connect timed out'));
                }
                ;
            }, this.options.connectTimeout || config_1.config.connectTimeout);
        };
        this.options = options;
        this.startGameData = {};
        this.clientRuntimeId = null;
        this.viewDistance = options.viewDistance ?? 10;
        if (this.options.transport === "nethernet") {
            this.nethernet = {};
        }
        if (!options.delayedInit) {
            this.init();
        }
        ;
    }
    ;
    setStatus(value) {
        logger_1.Logger.debug(`Status Update: ${this.status} -> ${value}`, this.options.debug);
        this.status = value;
    }
    connect() {
        if (!this.connection)
            throw new Error('Connect not currently allowed');
        this.once('session', this._connect);
        (0, auth_1.authenticate)(this, this.options);
        this.sendQ = [];
        this.loop = setInterval(this.onTick, 20);
    }
    ;
    disconnect(reason, hide = false) {
        if (this.status === types_1.clientStatus.Disconnected)
            return;
        this.write('disconnect', {
            hide_disconnect_screen: hide,
            message: reason,
            filtered_message: ''
        });
        this.close();
    }
    ;
    close() {
        if (this.status !== types_1.clientStatus.Disconnected)
            this.emit('close');
        clearInterval(this.loop);
        clearTimeout(this.connectTimeout);
        this.sendQ = [];
        this.connection?.close();
        //this.removeAllListeners();
        this.setStatus(types_1.clientStatus.Disconnected);
        this.networkSettingsRequested = false;
    }
    ;
    init() {
        if (this.options.protocolVersion !== config_1.config.protocol)
            throw errors_1.Errors.invalidProtocol(this.options.protocolVersion);
        this.serializer = (0, serializer_1.createSerializer)();
        this.deserializer = (0, serializer_1.createDeserializer)();
        (0, keyExchange_1.keyExchange)(this);
        (0, login_1.default)(this, this.options);
        (0, loginVerify_1.default)(this);
        const host = this.options.host;
        const port = this.options.port;
        const networkId = this.options.networkId;
        if (this.options.transport === 'nethernet') {
            this.connection = new nethernet_1.NethernetClient({ networkId });
            this.batchHeader = null;
            this.disableEncryption = true;
        }
        else if (this.options.transport === 'raknet') {
            this.connection = new rak_1.RaknetClient({ useWorkers: true, host, port });
            this.batchHeader = 0xfe;
            this.disableEncryption = false;
        }
        this.emit('connect_allowed');
    }
    ;
    get entityId() {
        return this.startGameData.runtime_entity_id;
    }
    ;
    readPacket(packet) {
        // if (config.ignoredPackets.includes(packet[0])) return;
        logger_1.Logger.debug(`Received Packet: ${packet[0]}`, config_1.config.debug);
        const des = this.deserializer.parsePacketBuffer(packet);
        const pakData = { name: des.data.name, params: des.data.params };
        //Startup
        switch (des.data.name) {
            case 'server_to_client_handshake':
                this.emit('client.server_handshake', des.data.params);
                break;
            case "network_settings": {
                const compressionAlgorithm = pakData.params.compression_algorithm ?? 'deflate';
                this.compressionAlgorithm = compressionAlgorithm;
                this.compressionHeader = compressionAlgorithm === 'snappy' ? 1 : 0;
                this.compressionThreshold = pakData.params.compression_threshold ?? this.compressionThreshold;
                this.compressionReady = true;
                if (this.status === types_1.clientStatus.Connecting)
                    this.sendLogin();
                break;
            }
            case 'disconnect':
                this.emit(des.data.name, des.data.params);
                this.onDisconnectRequest(des.data.params);
                break;
            case 'start_game':
                this.startGameData = pakData.params;
                break;
            case 'play_status':
                if (this.status === types_1.clientStatus.Authenticating) {
                    this.emit('join');
                    this.setStatus(types_1.clientStatus.Initializing);
                }
                this.onPlayStatus(pakData.params);
                break;
            default:
                if (this.status !== types_1.clientStatus.Initializing && this.status !== types_1.clientStatus.Initialized) {
                    console.error(`Can't accept ${des.data.name}, client not authenticated yet : ${this.status}`);
                    break;
                }
        }
        //Required Client Emits
        switch (des.data.name) {
            case "resource_packs_info":
                this.emit("resource_packs_info", des.data.params);
                break;
            case "resource_pack_stack":
                this.emit("resource_pack_stack", des.data.params);
                break;
        }
        // 1. Emit all packets if array is ommitted
        // 2. Emit only specific packets specified in the array
        if (!this.options.packets?.length) {
            this.emit(des.data.name, des.data.params);
        }
        else if (this.options.packets?.includes(des.data.name)) {
            this.emit(des.data.name, des.data.params);
        }
    }
    ;
    sendLogin() {
        this.setStatus(types_1.clientStatus.Authenticating);
        //@ts-ignore
        this.createClientChain(null, this.options.offline);
        // Removed "MC-Data Feature" - Unnecessary Backwards Compatibility
        const authType = auth_1.AuthenticationType.Full;
        const accessTokens = Array.isArray(this.accessToken) ? this.accessToken : [this.accessToken];
        const chain = [this.clientIdentityChain, ...accessTokens];
        const encodedLoginPayload = JSON.stringify({
            AuthenticationType: authType,
            Token: '',
            Certificate: JSON.stringify({ chain })
        });
        //@ts-ignore
        this.write('login', {
            protocol_version: config_1.config.protocol,
            tokens: {
                identity: encodedLoginPayload,
                client: this.clientUserChain
            }
        });
    }
    ;
    onDisconnectRequest(packet) {
        this.emit('kick', packet);
        this.close();
    }
    ;
    onPlayStatus(statusPacket) {
        if (this.status === types_1.clientStatus.Initializing && statusPacket.status === 'player_spawn') {
            this.setStatus(types_1.clientStatus.Initialized);
            this.emit("spawn");
            if (this.entityId)
                this.on('start_game', () => this.write('set_local_player_as_initialized', { runtime_entity_id: this.entityId }));
            else
                this.write('set_local_player_as_initialized', { runtime_entity_id: this.entityId });
        }
        ;
    }
    ;
}
exports.Client = Client;
;
