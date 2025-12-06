"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = exports.nextUUID = exports.uuidFrom = void 0;
const uuid_1345_1 = require("uuid-1345");
const uuidFrom = (value) => {
    return (0, uuid_1345_1.v3)({ namespace: '6ba7b811-9dad-11d1-80b4-00c04fd430c8', name: value });
};
exports.uuidFrom = uuidFrom;
const nextUUID = () => {
    return (0, exports.uuidFrom)(Date.now().toString());
};
exports.nextUUID = nextUUID;
const toBase64 = (value) => {
    return Buffer.from(value).toString('base64');
};
exports.toBase64 = toBase64;
