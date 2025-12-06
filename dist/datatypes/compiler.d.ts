export interface OperationTuple {
    0: 'native' | 'parametrizable' | 'context';
    1: any;
}
declare const _default: {
    Read: Record<string, OperationTuple>;
    SizeOf: Record<string, OperationTuple>;
    Write: Record<string, OperationTuple>;
};
export default _default;
