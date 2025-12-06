"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.getRandomUint64 = getRandomUint64;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
;
function getRandomUint64() {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    let value = 0n;
    for (let i = 0; i < 8; i++) {
        value = (value << 8n) | BigInt(bytes[i]);
    }
    return value;
}
