export declare class Codec {
    createPacketBuffer({ name, params }: {
        name: string;
        params: any;
    }): Buffer<ArrayBuffer>;
    parsePacketBuffer(buf: Buffer): {
        data: {
            name: string;
            params: any;
        };
    };
}
export declare const createSerializer: () => Codec;
export declare const createDeserializer: () => Codec;
