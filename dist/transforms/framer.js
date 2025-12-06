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
const zlib = __importStar(require("zlib"));
const varints_1 = require("../utils/varints");
class Framer {
    constructor(client) {
        this.packets = [];
        this.batchHeader = client.batchHeader;
        this.compressor = client.compressionAlgorithm || 'none';
        this.compressionLevel = client.compressionLevel;
        this.compressionThreshold = client.compressionThreshold;
        this.compressionHeader = client.compressionHeader || 0;
        this.writeCompressor = client.compressionReady;
    }
    reset(client) {
        this.packets = [];
        this.batchHeader = client.batchHeader;
        this.compressor = client.compressionAlgorithm || 'none';
        this.compressionLevel = client.compressionLevel;
        this.compressionThreshold = client.compressionThreshold;
        this.compressionHeader = client.compressionHeader || 0;
        this.writeCompressor = client.compressionReady;
    }
    compress(buffer) {
        switch (this.compressor) {
            case 'deflate': return zlib.deflateRawSync(buffer, { level: this.compressionLevel });
            case 'snappy': throw Error('Snappy compression not implemented');
            case 'none': return buffer;
            default: return buffer;
        }
    }
    static decompress(algorithm, buffer) {
        switch (algorithm) {
            case 0:
            case 'deflate':
                return zlib.inflateRawSync(buffer, { chunkSize: 512000 });
            case 1:
            case 'snappy':
                throw Error('Snappy compression not implemented');
            case 'none':
            case 255:
                return buffer;
            default: throw Error('Unknown compression type ' + algorithm);
        }
    }
    static decode(client, buf) {
        //Changed batchHeader from "this.batchHeader" to "client.batchHeader" & added a ? 1 : 0 check
        //@ts-ignore
        if (client.batchHeader && buf[0] !== client.batchHeader)
            throw Error(`bad batch packet header, received: ${buf[0]}, expected: ${this.batchHeader}`);
        const buffer = buf.slice(client.batchHeader ? 1 : 0);
        let decompressed;
        //@ts-ignore
        if (client.compressionReady) {
            try {
                decompressed = Framer.decompress(buffer[0], buffer.slice(1));
            }
            catch (e) {
                //Fallback
                client.emit?.("error", e);
                return [];
            }
        }
        else {
            try {
                decompressed = Framer.decompress(client.compressionAlgorithm, buffer);
            }
            catch (e) {
                decompressed = buffer;
            }
        }
        return Framer.getPackets(decompressed);
    }
    encode() {
        const buf = Buffer.concat(this.packets);
        const shouldCompress = buf.length > this.compressionThreshold;
        const header = this.batchHeader ? [this.batchHeader] : [];
        if (this.writeCompressor) {
            header.push(shouldCompress ? this.compressionHeader : 255);
        }
        return Buffer.concat([Buffer.from(header), shouldCompress ? this.compress(buf) : buf]);
    }
    addEncodedPacket(chunk) {
        const varIntSize = (0, varints_1.sizeOfVarInt)(chunk.byteLength);
        const buffer = Buffer.allocUnsafe(varIntSize + chunk.byteLength);
        (0, varints_1.writeVarInt)(chunk.length, buffer, 0);
        chunk.copy(buffer, varIntSize);
        this.packets.push(buffer);
    }
    addEncodedPackets(packets) {
        let allocSize = 0;
        for (const packet of packets) {
            allocSize += (0, varints_1.sizeOfVarInt)(packet.byteLength);
            allocSize += packet.byteLength;
        }
        const buffer = Buffer.allocUnsafe(allocSize);
        let offset = 0;
        for (const chunk of packets) {
            offset = (0, varints_1.writeVarInt)(chunk.length, buffer, offset);
            offset += chunk.copy(buffer, offset, 0);
        }
        this.packets.push(buffer);
    }
    getBuffer() {
        return Buffer.concat(this.packets);
    }
    static getPackets(buffer) {
        const maxPacket = 2 * 1024 * 1024;
        const packets = [];
        let offset = 0;
        while (offset < buffer.byteLength) {
            const { value, size } = (0, varints_1.readVarInt)(buffer, offset);
            if (value < 0 || value > maxPacket) {
                throw new Error(`Packet too large/invalid (${value} bytes)`);
            }
            if (offset + size + value > buffer.byteLength) {
                throw new Error("Truncated packet payload");
            }
            const dec = Buffer.allocUnsafe(value);
            offset += size;
            offset += buffer.copy(dec, 0, offset, offset + value);
            packets.push(dec);
        }
        return packets;
    }
}
exports.default = Framer;
