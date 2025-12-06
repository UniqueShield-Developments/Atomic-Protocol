export type ErrorCode = "PACKET_UNKNOWN" | "NETWORK_DISCONNECTED" | "INVALID_REALM" | "INVITE_FAILED" | "INVALID_PROTOCOL" | "UNSUPPORTED_PROTOCOL" | "CREATION_FAILED";
export declare class AtomicError extends Error {
    readonly code: ErrorCode;
    readonly details?: Record<string, unknown>;
    constructor(code: ErrorCode, message: string, details?: Record<string, unknown>);
}
export declare const Errors: {
    unknownPacket(details?: Record<string, unknown>): AtomicError;
    disconnected(reason?: string): AtomicError;
    noRealm(code: number, text: string): AtomicError;
    inviteFailed(): AtomicError;
    invalidProtocol(current: number | undefined): AtomicError;
    unsupportedProtocol(): AtomicError;
};
