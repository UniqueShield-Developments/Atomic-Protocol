"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NethernetClient = void 0;
const atomic_net_1 = require("atomic-net");
class NethernetClient {
    constructor(options = {}) {
        this.connected = false;
        this.onConnected = () => { };
        this.onCloseConnection = () => { };
        this.onEncapsulated = () => { };
        this.nethernet = new atomic_net_1.Client(options.networkId);
        this.nethernet.on('connected', (client) => {
            //@ts-ignore
            this.onConnected(client);
            this.connected = true;
        });
        this.nethernet.on('disconnect', (reason) => {
            this.onCloseConnection(reason);
            this.connected = false;
        });
        this.nethernet.on('encapsulated', (data, address) => {
            if (this.connected) {
                this.onEncapsulated({ buffer: data }, address);
            }
        });
    }
    async connect() {
        await this.nethernet.connect();
    }
    sendReliable(data) {
        this.nethernet.send(data);
    }
    set credentials(value) {
        this.nethernet.credentials = value;
    }
    get credentials() {
        return this.nethernet.credentials;
    }
    set signalHandler(handler) {
        this.nethernet.signalHandler = handler;
    }
    handleSignal(signal) {
        this.nethernet.handleSignal(signal);
    }
    async ping(timeout = 10000) {
        this.nethernet.ping();
        return waitFor((done) => {
            this.nethernet.once('pong', (ret) => { done(ret.data); });
        }, timeout, () => {
            throw new Error('Ping timed out');
        });
    }
    close() {
        this.nethernet.close("");
    }
}
exports.NethernetClient = NethernetClient;
async function waitFor(cb, withTimeout, onTimeout) {
    let t;
    const ret = await Promise.race([
        new Promise((resolve, reject) => cb(resolve, reject)),
        new Promise(resolve => { t = setTimeout(() => resolve('timeout'), withTimeout); })
    ]);
    clearTimeout(t);
    if (ret === 'timeout')
        await onTimeout();
    return ret;
}
