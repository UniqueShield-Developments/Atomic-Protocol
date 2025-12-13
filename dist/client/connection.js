"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Connection_status;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const events_1 = require("events");
const config_1 = require("../config/config");
const encryption_1 = require("../transforms/encryption");
const framer_1 = __importDefault(require("../transforms/framer"));
const serializer_1 = require("../transforms/serializer");
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
class Connection extends events_1.EventEmitter {
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    constructor() {
        super();
        this.encryptionEnabled = false;
        this.disableEncryption = false;
        this.compressionReady = false;
        this.compressionAlgorithm = types_1.CompressionAlgorithm.None;
        this.compressionThreshold = 512;
        this.compressionHeader = 0;
        this.compressionLevel = 7;
        this.batchHeader = 0xfe;
        _Connection_status.set(this, types_1.clientStatus.Disconnected);
        this.sendQ = [];
        this.onTick = this._tick.bind(this);
        this.onEncryptedPacket = (buf) => {
            const packet = this.batchHeader ? Buffer.concat([Buffer.from([this.batchHeader]), buf]) : buf;
            this.sendPackets(packet, false);
        };
        this.onDecryptedPacket = (buf) => {
            try {
                const packets = framer_1.default.getPackets(buf, { label: "onDecryptedPacket" });
                packets.forEach((packet) => {
                    //@ts-ignore
                    this.readPacket(packet);
                });
            }
            catch (err) {
                logger_1.Logger.debug(`[Framer] failed to decode decrypted batch length=${buf.byteLength}`, config_1.config.debug);
                this.emit("error", err);
            }
        };
        this.serializer = (0, serializer_1.createSerializer)();
        this.deserializer = (0, serializer_1.createDeserializer)();
        this.framer = new framer_1.default(this);
    }
    ;
    get status() {
        return __classPrivateFieldGet(this, _Connection_status, "f");
    }
    ;
    set status(val) {
        this.emit('status', val);
        __classPrivateFieldSet(this, _Connection_status, val, "f");
    }
    ;
    startEncryption(iv) {
        if (this.disableEncryption)
            return;
        this.encryptionEnabled = true;
        //@ts-ignore
        logger_1.Logger.debug(`Started Encryption ${JSON.stringify({ iv: Array.from(iv || []), shared: !!this.sharedSecret })}`, config_1.config.debug);
        this.decrypt = (0, encryption_1.createDecryptor)(this, iv);
        this.encrypt = (0, encryption_1.createEncryptor)(this, iv);
    }
    ;
    write(name, params) {
        if (name === "command_request") {
            params ??= {};
            params.command ??= "";
            params.origin ??= {};
            params.origin.origin ??= "player";
            params.origin.uuid ??= "00000000-0000-0000-0000-000000000000";
            params.origin.request_id ??= "req";
            params.origin.player_entity_id ??= 1n;
            params.internal ??= false;
            params.version ??= "latest";
        }
        this.framer.reset(this);
        const packet = this.serializer.createPacketBuffer({ name, params });
        this.framer.addEncodedPacket(packet);
        if (this.encryptionEnabled)
            this.sendEncryptedBatch(this.framer);
        else
            this.sendDecryptedBatch(this.framer);
    }
    ;
    queue(name, params) {
        const packet = this.serializer.createPacketBuffer({ name, params });
        if (name === 'level_chunk')
            return; //The client does not need the world data...
        this.sendQ.push(packet);
    }
    ;
    _tick() {
        if (this.sendQ.length) {
            this.framer.reset(this);
            this.framer.addEncodedPackets(this.sendQ);
            this.sendQ = [];
            if (this.encryptionEnabled)
                this.sendEncryptedBatch(this.framer);
            else
                this.sendDecryptedBatch(this.framer);
        }
        ;
    }
    ;
    sendBuffer(buffer, immediate) {
        if (!immediate)
            return this.sendQ.push(buffer);
        this.framer.reset(this);
        this.framer.addEncodedPacket(buffer);
        if (this.encryptionEnabled)
            this.sendEncryptedBatch(this.framer);
        else
            this.sendDecryptedBatch(this.framer);
    }
    ;
    sendEncryptedBatch(batch) {
        const buf = batch.getBuffer();
        this.encrypt(buf);
    }
    ;
    sendDecryptedBatch(batch) {
        this.sendPackets(batch.encode(), true);
    }
    ;
    sendPackets(buffer, immediate) {
        if (this?.connection?.connected === false || this.status === types_1.clientStatus.Disconnected)
            return;
        try {
            this.connection.sendReliable(buffer, immediate);
        }
        catch (e) {
            console.error('while sending to', this.connection, e);
        }
        ;
    }
    ;
    handle(buffer) {
        if (!this.batchHeader || buffer[0] === this.batchHeader) {
            if (this.encryptionEnabled)
                this.decrypt(buffer.slice(1));
            else {
                try {
                    const packets = framer_1.default.decode(this, buffer);
                    for (let packet of packets) {
                        //@ts-ignore
                        this.readPacket(packet);
                    }
                }
                catch (err) {
                    logger_1.Logger.debug(`[Framer] decode error batchLength=${buffer.byteLength} compression=${this.compressionAlgorithm} ready=${this.compressionReady}`, config_1.config.debug);
                    this.emit("error", err);
                }
            }
            ;
        }
        else {
            this.emit("error", new Error(`bad packet header` + buffer[0]));
            this.close?.();
            return;
        }
        ;
    }
    ;
}
exports.Connection = Connection;
_Connection_status = new WeakMap();
;
