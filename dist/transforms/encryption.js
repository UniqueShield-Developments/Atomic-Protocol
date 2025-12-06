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
exports.createEncryptor = exports.createDecryptor = void 0;
const crypto = __importStar(require("crypto"));
const zlib_1 = require("zlib");
const createDecryptor = (client, iv) => {
    const decipher = createDecipher(client.secretKeyBytes, iv);
    client.receiveCounter = client.receiveCounter || 0n;
    decipher.on('data', verify);
    return (blob) => {
        decipher.write(blob);
    };
    function verify(chunk) {
        const packet = chunk.slice(0, chunk.length - 8);
        const checksum = chunk.slice(chunk.length - 8, chunk.length);
        const computedCheckSum = computeCheckSum(packet, client.receiveCounter, client.secretKeyBytes);
        client.receiveCounter++;
        if (!checksum.equals(computedCheckSum)) {
            client.emit('error', Error(`Checksum mismatch ${checksum.toString('hex')} != ${computedCheckSum.toString('hex')}`));
            client.disconnect('disconnectionScreen.badPacket');
            return;
        }
        let buffer;
        try {
            switch (packet[0]) {
                case 0:
                    try {
                        buffer = (0, zlib_1.inflateRawSync)(packet.slice(1), { chunkSize: 512000 });
                        break;
                    }
                    catch (e) {
                        client.emit('error', e);
                        client.disconnect('disconnectionScreen.badPacket');
                        return;
                    }
                case 255:
                    buffer = packet.slice(1);
                    break;
                default:
                    try {
                        client.emit('error', Error(`Unsupported compressor: ${packet[0]}`));
                    }
                    catch (e) {
                        client.emit('error', e);
                        client.disconnect('disconnectionScreen.badPacket');
                        return;
                    }
            }
        }
        catch (e) {
            client.emit("error", e);
            client.disconnect("disconnectionScreen.badPacket");
            return;
        }
        client.onDecryptedPacket(buffer);
    }
};
exports.createDecryptor = createDecryptor;
const createEncryptor = (client, iv) => {
    const cipher = createCipher(client.secretKeyBytes, iv.slice(0, 12));
    client.sendCounter = client.sendCounter || 0n;
    cipher.on('data', client.onEncryptedPacket);
    return (blob) => {
        process(blob);
    };
    function process(chunk) {
        let compressed;
        try {
            compressed = (0, zlib_1.deflateRawSync)(chunk, { level: client.compressionLevel });
        }
        catch (e) {
            client.emit('error', e);
            return;
        }
        const buffer = Buffer.concat([Buffer.from([0]), compressed]);
        const checksum = computeCheckSum(buffer, client.sendCounter, client.secretKeyBytes);
        const packet = Buffer.concat([buffer, checksum]);
        client.sendCounter++;
        cipher.write(packet);
    }
};
exports.createEncryptor = createEncryptor;
function createDecipher(secret, initialValue) {
    return crypto.createDecipheriv('aes-256-gcm', secret, initialValue.slice(0, 12));
}
function createCipher(secret, initialValue) {
    return crypto.createCipheriv('aes-256-gcm', secret, initialValue.slice(0, 12));
}
function computeCheckSum(packetPlaintext, sendCounter, secretKeyBytes) {
    const digest = crypto.createHash('sha256');
    const counter = Buffer.alloc(8);
    counter.writeBigInt64LE(sendCounter, 0);
    digest.update(counter);
    digest.update(packetPlaintext);
    digest.update(secretKeyBytes);
    const hash = digest.digest();
    return hash.slice(0, 8);
}
