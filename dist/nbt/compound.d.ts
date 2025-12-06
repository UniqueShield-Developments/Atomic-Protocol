export declare function readCompound(buffer: Buffer, offset: number, typeArgs: any, rootNode: any): {
    value: {
        type: any;
        value: any;
    };
    size: number;
};
export declare function writeCompound(value: any, buffer: Buffer, offset: number, typeArgs: any, rootNode: any): number;
export declare function sizeOfCompound(value: any, typeArgs: any, rootNode: any): number;
