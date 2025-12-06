"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismarine_nbt_1 = __importDefault(require("prismarine-nbt"));
const uuid_1345_1 = __importDefault(require("uuid-1345"));
const protoLE = prismarine_nbt_1.default.protos.little;
const ptrotoLEV = prismarine_nbt_1.default.protos.littleVarint;
// UUID
function readUUID(buffer, offset) {
    if (offset + 16 > buffer.length) {
        throw new Error('reached end of buffer');
    }
    ;
    return {
        value: uuid_1345_1.default.stringify(buffer.slice(offset, 16 + offset)),
        size: 16
    };
}
;
function writeUUID(value, buffer, offset) {
    const buf = uuid_1345_1.default.parse(value);
    buf.copy(buffer, offset);
    return offset + 16;
}
;
// NBT
function readNbt(buffer, offset) {
    return ptrotoLEV.read(buffer, offset, 'nbt');
}
;
function writeNbt(value, buffer, offset) {
    return ptrotoLEV.write(value, buffer, offset, 'nbt');
}
;
function sizeOfNbt(value) {
    return ptrotoLEV.sizeOf(value, 'nbt');
}
;
// NBT Little Endian
function readNbtLE(buffer, offset) {
    const r = protoLE.read(buffer, offset, 'nbt');
    if (r.value.type === 'end')
        return { value: r.value, size: 1 };
    return r;
}
;
function writeNbtLE(value, buffer, offset) {
    if (value.type === 'end') {
        buffer.writeInt8(0, offset);
        return offset + 1;
    }
    ;
    return protoLE.write(value, buffer, offset, 'nbt');
}
;
function sizeOfNbtLE(value) {
    if (value.type === 'end')
        return 1;
    return protoLE.sizeOf(value, 'nbt');
}
;
// Entity Metadata
function readEntityMetadata(buffer, offset, _ref) {
    const type = _ref.type;
    const endVal = _ref.endVal;
    const metadata = [];
    let cursor = offset;
    let item;
    while (true) {
        if (offset + 1 > buffer.length)
            throw new Error('reached end of buffer');
        item = buffer.readUInt8(cursor);
        if (item === endVal) {
            return {
                value: metadata,
                size: cursor + 1 - offset
            };
        }
        //@ts-ignore
        const results = this.read(buffer, cursor, type, {});
        metadata.push(results.value);
        cursor += results.size;
    }
    ;
}
;
function writeEntityMetadata(value, buffer, offset, _ref2) {
    const type = _ref2.type;
    const endVal = _ref2.endVal;
    //@ts-ignore
    const self = this;
    value.forEach(function (item) {
        offset = self.write(item, buffer, offset, type, {});
    });
    buffer.writeUInt8(endVal, offset);
    return offset += 1;
}
;
function sizeOfEntityMetadata(value, _ref3Z) {
    const type = _ref3Z.type;
    let size = 1;
    for (let i = 0; i < value.length; ++i) {
        //@ts-ignore
        size += this.sizeOf(value[i], type, {});
    }
    ;
    return size;
}
;
// Address
function readIpAddress(buffer, offset) {
    const address = buffer[offset] + '.' + buffer[offset + 1] + '.' + buffer[offset + 2] + '.' + buffer[offset + 3];
    return {
        size: 4,
        value: address
    };
}
;
function writeIpAddress(value, buffer, offset) {
    const address = value.split('.');
    address.forEach(function (b) {
        buffer[offset] = parseInt(b);
        offset++;
    });
    return offset;
}
;
function readEndOfArray(buffer, offset, typeArgs) {
    const type = typeArgs.type;
    let cursor = offset;
    const elements = [];
    while (cursor < buffer.length) {
        //@ts-ignore
        const results = this.read(buffer, cursor, type, {});
        elements.push(results.size);
        cursor += results.size;
    }
    ;
    return {
        value: elements,
        size: cursor - offset
    };
}
;
function writeEndOfArray(value, buffer, offset, typeArgs) {
    const type = typeArgs.type;
    //@ts-ignore
    const self = this;
    value.forEach(function (item) {
        offset = self.write(item, buffer, offset, type, {});
    });
    return offset;
}
;
function sizeOfEndOfArray(value, typeArgs) {
    const type = typeArgs.type;
    let size = 0;
    for (let i = 0; i < value.length; i++) {
        //@ts-ignore
        size += this.sizeOf(value[i], type, {});
    }
    ;
    return size;
}
;
exports.default = {
    uuid: [readUUID, writeUUID, 16],
    nbt: [readNbt, writeNbt, sizeOfNbt],
    lnbt: [readNbtLE, writeNbtLE, sizeOfNbtLE],
    entityMetadataLoop: [readEntityMetadata, writeEntityMetadata, sizeOfEntityMetadata],
    ipAddress: [readIpAddress, writeIpAddress, 4],
    endOfArray: [readEndOfArray, writeEndOfArray, sizeOfEndOfArray]
};
