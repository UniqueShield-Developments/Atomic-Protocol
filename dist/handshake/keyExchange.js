"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyExchange = void 0;
const crypto = __importStar(require("crypto"));
const config_1 = require("../config/config");
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
const curve = 'secp384r1';
const pem = { format: 'pem', type: 'sec1' };
const der = { format: 'der', type: 'spki' };
const keyExchange = (client) => {
    client.ecdhKeyPair = crypto.generateKeyPairSync('ec', { namedCurve: curve });
    client.publicKeyDER = client.ecdhKeyPair.publicKey.export(der);
    client.privateKeyPEM = client.ecdhKeyPair.privateKey.export(pem);
    client.clientX509 = client.publicKeyDER.toString('base64');
    function startServerboundEncryption(token) {
        logger_1.Logger.debug("- ENCRYPT - Starting Serverbound Encryption", config_1.config.debug);
        const jwt = token?.token;
        if (!jwt)
            throw Error('Server did not return a valid JWT, cannot start encryption');
        const [header, payload] = jwt.split('.').map(k => Buffer.from(k, 'base64'));
        const head = JSON.parse(String(header));
        const body = JSON.parse(String(payload));
        //@ts-ignore
        const pubKeyDer = crypto.createPublicKey({ key: Buffer.from(head.x5u, 'base64'), ...der });
        client.sharedSecret = crypto.diffieHellman({ privateKey: client.ecdhKeyPair.privateKey, publicKey: pubKeyDer });
        const salt = Buffer.from(body.salt, 'base64');
        const secretHash = crypto.createHash('sha256');
        secretHash.update(salt);
        secretHash.update(client.sharedSecret);
        client.secretKeyBytes = secretHash.digest();
        const iv = client.secretKeyBytes.slice(0, 16);
        client.startEncryption(iv);
        client.write('client_to_server_handshake', {});
        //@ts-ignore
        client.emit('join');
        client.setStatus(types_1.clientStatus.Initializing);
    }
    client.once('client.server_handshake', startServerboundEncryption);
};
exports.keyExchange = keyExchange;
