"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1345_1 = __importDefault(require("uuid-1345"));
const minecraft_1 = __importDefault(require("./minecraft"));
;
const Read = {};
const Write = {};
const SizeOf = {};
// --------------- UUID ---------------
Read.uuid = ['native', (buffer, offset) => {
        return {
            value: uuid_1345_1.default.stringify(buffer.slice(offset, 16 + offset)),
            size: 16
        };
    }
];
Write.uuid = ['native', (value, buffer, offset) => {
        const buf = uuid_1345_1.default.parse(value);
        buf.copy(buffer, offset);
        return offset + 16;
    }
];
SizeOf.uuid = ['native', 16];
// --------------- Buffer ---------------
Read.restBuffer = ['native', (buffer, offset) => {
        return {
            value: buffer.slice(offset),
            size: buffer.length - offset
        };
    }
];
Write.restBuffer = ['native', (value, buffer, offset) => {
        value.copy(buffer, offset);
        return offset + value.length;
    }
];
SizeOf.restBuffer = ['native', (value) => {
        return value.length;
    }
];
// --------------- Encapsulated ---------------
Read.encapsulated = ['parametrizable', (compiler, { lengthType, type }) => {
        return compiler.wrapCode(`
              const payloadSize = ${compiler.callType(lengthType, "offset")}
              const { value, size } = ctx.${type}(buffer, offset + payloadSize.size)
              return { value, size: size + payloadSize.size }
            `.trim());
    }
];
Write.encapsulated = ['parametrizable', (compiler, { lengthType, type }) => {
        return compiler.wrapCode(`
          const buf = Buffer.allocUnsafe(buffer.length - offset)
          const payloadSize = ctx.${type}(value, buf, 0)
          let size = ctx.${lengthType}(payloadSize, buffer, offset)
          size += buf.copy(buffer, size, 0, payloadSize)
          return size
        `.trim());
    },
];
SizeOf.encapsulated = ['parametrizable', (compiler, { lengthType, type }) => {
        return compiler.wrapCode(`
          const payloadSize = ctx.${type}(value)
          return ctx.${lengthType}(payloadSize) + payloadSize
        `.trim());
    },
];
// --------------- NBT Loop ---------------
Read.nbtLoop = ["context", (buffer, offset) => {
        const values = [];
        while (buffer[offset] != 0) {
            const n = ctx.nbt(buffer, offset);
            values.push(n.value);
            offset += n.size;
        }
        ;
        return { value: values, size: buffer.length - offset };
    }
];
Write.nbtLoop = ['context', (value, buffer, offset) => {
        value.forEach((val) => {
            offset = ctx.nbt(val, buffer, offset);
        });
        buffer.writeUint8(0, offset);
        return offset + 1;
    }
];
SizeOf.nbtLoop = ['context', (value, buffer, offset) => {
        let size = 1;
        value.forEach((val) => {
            size += ctx.nbt(val, buffer, offset);
        });
        return size;
    }
];
// --------------- Byte Rotation ---------------
Read.byterot = ['context', (buffer, offset) => {
        const val = buffer.readUint8(offset);
        return { value: val * (360 / 256), size: 1 };
    }
];
Write.byterot = ['context', (value, buffer, offset) => {
        const val = value / (360 / 256);
        buffer.writeUint8(val, offset);
        return offset + 1;
    }
];
SizeOf.byterot = ['context', (value, buffer, offset) => {
        return 1;
    }
];
// --------------- Module ---------------
const mc = minecraft_1.default;
Read.nbt = ['native', mc.nbt[0]];
Write.nbt = ['native', mc.nbt[1]];
SizeOf.nbt = ['native', mc.nbt[2]];
Read.lnbt = ['native', mc.lnbt[0]];
Write.lnbt = ['native', mc.lnbt[1]];
SizeOf.lnbt = ['native', mc.lnbt[2]];
// --------------- Enum Size ---------------
// values are undefined in bedrock-protocol/src/datatypes/compiler-minecraft.js line 123
Read.enum_size_based_on_values_len = ['parametrizable', (compiler) => {
        return compiler.wrapCode(js(() => {
            //@ts-ignore
            if (values_len <= 0xff)
                return { value: 'byte', size: 0 };
            //@ts-ignore
            if (values_len <= 0xffff)
                return { value: 'short', size: 0 };
            //@ts-ignore
            if (values_len <= 0xffffff)
                return { value: 'int', size: 0 };
        }));
    }
];
Write.enum_size_based_on_values_len = ['parametrizable', (compiler) => {
        return str(() => {
            //@ts-ignore
            if (value.values_len <= 0xff)
                _enum_type = 'byte';
            //@ts-ignore
            else if (value.values_len <= 0xffff)
                _enum_type = 'short';
            //@ts-ignore
            else if (value.values_len <= 0xffffff)
                _enum_type = 'int';
            //@ts-ignore
            return offset;
        });
    }
];
SizeOf.enum_size_based_on_values_len = ["parametrizable", (compiler) => {
        return str(() => {
            //@ts-ignore
            if (value.values_len <= 0xff)
                _enum_type = "byte";
            //@ts-ignore
            else if (value.values_len <= 0xffff)
                _enum_type = "short";
            //@ts-ignore
            else if (value.values_len <= 0xffffff)
                _enum_type = "int";
            return 0;
        });
    },
];
function js(fn) {
    return fn.toString().split("\n").slice(1, -1).join("\n").trim();
}
;
function str(fn) {
    return fn.toString() + ")();(()=>{}";
}
exports.default = { Read, SizeOf, Write };
