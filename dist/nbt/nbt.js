"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protos = void 0;
const protodef_1 = require("protodef");
const beNbtJson = JSON.stringify(require('./nbt.json'));
const leNbtJson = beNbtJson.replace(/([iuf][0-7]+)/g, 'l$1');
const varintJson = JSON.stringify(require('./nbt-varint.json')).replace(/([if][0-7]+)/g, 'l$1');
function addTypesToCompiler(type, compiler) {
    compiler.addTypes(require('./compiler-compound'));
    compiler.addTypes(require('./compiler-tagname'));
    compiler.addTypes(require('./optional').compiler);
    let proto = beNbtJson;
    if (type === 'littleVarint')
        proto = varintJson;
    else if (type === 'little')
        proto = leNbtJson;
    compiler.addTypesToCompile(JSON.parse(proto));
}
function createProto(type) {
    const compiler = new protodef_1.Compiler.ProtoDefCompiler();
    addTypesToCompiler(type, compiler);
    return compiler.compileProtoDefSync();
}
const protoBE = createProto('big');
const protoLE = createProto('little');
const protoVarInt = createProto('littleVarint');
exports.protos = {
    big: protoBE,
    little: protoLE,
    littleVarint: protoVarInt
};
