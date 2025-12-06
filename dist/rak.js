"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaknetClient = void 0;
const node_events_1 = require("node:events");
const raknet_native_1 = require("raknet-native");
class RaknetClient extends node_events_1.EventEmitter {
    constructor(options) {
        super();
        this.connected = false;
        this.onConnected = () => { };
        this.onCloseConnection = () => { };
        this.onEncapsulated = () => { };
        this.raknet = new raknet_native_1.Client(options.host, Number(options.port), {
            protocolVersion: 11
        });
        this.raknet.on("encapsulated", (packet) => {
            if (this.connected) {
                this.onEncapsulated(packet.buffer, packet.address);
            }
        });
        this.raknet.on("connect", () => {
            if (this.connected)
                return;
            this.connected = true;
            this.onConnected();
        });
        this.raknet.on("disconnect", (packet) => {
            this.connected = false;
            this.onCloseConnection(packet.reason);
        });
    }
    ;
    async ping(timeout = 1000) {
        this.raknet.ping();
        return new Promise((resolve, reject) => {
            const onTimeout = setTimeout(() => {
                this.raknet.off("pong", onPong);
                reject(new Error("ping timeout"));
            }, timeout);
            const onPong = (ret) => {
                clearTimeout(onTimeout);
                this.raknet.off("pong", onPong);
                resolve(ret?.extra ? ret.extra.toString() : null);
            };
            this.raknet.on("pong", onPong);
        });
    }
    ;
    connect() {
        this.raknet.connect();
    }
    ;
    close() {
        try {
            this.connected = false;
            setTimeout(() => this.raknet.close(), 40);
        }
        catch { }
    }
    ;
    sendReliable(buffer, immediate) {
        if (!this.connected)
            return;
        const priority = immediate ? raknet_native_1.PacketPriority.IMMEDIATE_PRIORITY : raknet_native_1.PacketPriority.MEDIUM_PRIORITY;
        return this.raknet.send(buffer, priority, raknet_native_1.PacketReliability.RELIABLE_ORDERED, 0);
    }
    ;
}
exports.RaknetClient = RaknetClient;
;
