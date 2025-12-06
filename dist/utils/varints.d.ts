import { Buffer } from "buffer";
export declare function readVarInt(buffer: Buffer, offset: number): {
    value: number;
    size: number;
};
export declare function sizeOfVarInt(value: number): number;
export declare function writeVarInt(value: number, buffer: Buffer, offset: number): number;
