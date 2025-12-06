"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Read: {
        optionalNbtType: ['parametrizable', (compiler, { tagType }) => {
                return compiler.wrapCode(`
  if (offset + 1 > buffer.length) { throw new PartialReadError() }
  if (buffer.readInt8(offset) === 0) return { size: 1 }
  return ${compiler.callType(tagType)}
        `);
            }]
    },
    Write: {
        optionalNbtType: ['parametrizable', (compiler, { tagType }) => {
                return compiler.wrapCode(`
  if (value === undefined) {
    buffer.writeInt8(0, offset)
    return offset + 1
  }
  return ${compiler.callType('value', tagType)}
        `);
            }]
    },
    SizeOf: {
        optionalNbtType: ['parametrizable', (compiler, { tagType }) => {
                return compiler.wrapCode(`
  if (value === undefined) { return 1 }
  return ${compiler.callType('value', tagType)}
        `);
            }]
    }
};
