"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.AtomicError = void 0;
const config_1 = require("../config/config");
class AtomicError extends Error {
    constructor(code, message, details) {
        super(`[${code}] ${message}`);
        this.name = "AtomicError";
        this.code = code;
        this.details = details;
        Error.captureStackTrace?.(this, AtomicError);
    }
}
exports.AtomicError = AtomicError;
exports.Errors = {
    unknownPacket(details) {
        return new AtomicError("PACKET_UNKNOWN", "Received unrecognized packet type.", details);
    },
    disconnected(reason) {
        return new AtomicError("NETWORK_DISCONNECTED", reason ?? "Connection was lost.");
    },
    noRealm(code, text) {
        return new AtomicError("INVALID_REALM", `Unable to gather the realm's IP/PORT. (${code}:${text})`);
    },
    inviteFailed() {
        return new AtomicError("INVITE_FAILED", "Unable to accept realm invite.");
    },
    invalidProtocol(current) {
        return new AtomicError("INVALID_PROTOCOL", `Unsupported protocol version: ${current}. (Supported ${config_1.config.protocol})`);
    },
    unsupportedProtocol() {
        return new AtomicError("UNSUPPORTED_PROTOCOL", `Unsupported protocol: "NETHERNET".`);
    },
    noTokens() {
        return new AtomicError("INVALID_TOKENS", "Unable to authenticate. No tokens provided.");
    },
};
