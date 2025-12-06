declare const _default: {
    Read: {
        compound: (string | ((buffer: Buffer, offset: number) => {
            value: {
                type: any;
                value: any;
            };
            size: number;
        }))[];
    };
    Write: {
        compound: (string | ((value: Array<{
            type: any;
            value: any;
        }>, buffer: Buffer, offset: number) => number))[];
    };
    SizeOf: {
        compound: (string | ((value: Array<{
            type: any;
            value: any;
        }>) => number))[];
    };
};
export default _default;
