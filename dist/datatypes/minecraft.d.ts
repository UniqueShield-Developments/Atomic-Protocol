declare function readUUID(buffer: Buffer, offset: number): {
    value: string;
    size: number;
};
declare function writeUUID(value: any, buffer: Buffer, offset: number): number;
declare function readNbt(buffer: Buffer, offset: number): any;
declare function writeNbt(value: any, buffer: Buffer, offset: number): any;
declare function readNbtLE(buffer: Buffer, offset: number): any;
declare function writeNbtLE(value: any, buffer: Buffer, offset: number): any;
declare function readEntityMetadata(buffer: Buffer, offset: number, _ref: any): {
    value: any[];
    size: number;
};
declare function writeEntityMetadata(value: any, buffer: Buffer, offset: number, _ref2: any): number;
declare function readIpAddress(buffer: Buffer, offset: number): {
    size: number;
    value: string;
};
declare function writeIpAddress(value: any, buffer: Buffer, offset: number): number;
declare function readEndOfArray(buffer: Buffer, offset: number, typeArgs: any): {
    value: any[];
    size: number;
};
declare function writeEndOfArray(value: any, buffer: Buffer, offset: number, typeArgs: any): number;
declare const _default: {
    uuid: (number | typeof readUUID | typeof writeUUID)[];
    nbt: (typeof readNbt | typeof writeNbt)[];
    lnbt: (typeof readNbtLE | typeof writeNbtLE)[];
    entityMetadataLoop: (typeof readEntityMetadata | typeof writeEntityMetadata)[];
    ipAddress: (number | typeof readIpAddress | typeof writeIpAddress)[];
    endOfArray: (typeof readEndOfArray | typeof writeEndOfArray)[];
};
export default _default;
