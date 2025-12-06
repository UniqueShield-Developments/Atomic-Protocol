"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPString = readPString;
exports.writePString = writePString;
exports.sizeOfPString = sizeOfPString;
function readPString(buffer, offset) {
    //@ts-ignore
    const { value, size } = ctx.shortString(buffer, offset);
    for (const c of value) {
        if (c === '\0')
            throw new Error('unexpected tag end');
    }
    return { value, size };
}
function writePString(...args) {
    //@ts-ignore
    return ctx.shortString(...args);
}
function sizeOfPString(...args) {
    //@ts-ignore
    return ctx.shortString(...args);
}
