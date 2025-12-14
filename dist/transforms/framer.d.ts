import { Connection } from "../client/connection";
export default class Framer {
    packets: Array<Buffer>;
    batchHeader: number;
    compressor: string;
    compressionLevel: number;
    compressionThreshold: number;
    compressionHeader: number;
    writeCompressor: boolean;
    constructor(client: Connection);
    reset(client: Connection): void;
    compress(buffer: Buffer): Buffer<ArrayBufferLike>;
    static decompress(algorithm: any, buffer: Buffer): Buffer<ArrayBufferLike>;
    static decode(client: Connection, buf: Buffer): Buffer<ArrayBufferLike>[];
    encode(): Buffer<ArrayBuffer>;
    addEncodedPacket(chunk: Buffer): void;
    addEncodedPackets(packets: Buffer[]): void;
    getBuffer(): Buffer<ArrayBuffer>;
    static getPackets(buffer: Buffer): Buffer<ArrayBufferLike>[];
}
