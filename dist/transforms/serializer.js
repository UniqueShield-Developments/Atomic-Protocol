"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeserializer = exports.createSerializer = void 0;
const protodef_1 = require("protodef");
const protocol_json_1 = __importDefault(require("../config/protocol.json"));
class Parser extends protodef_1.FullPacketParser {
}
class CustomCompiler extends protodef_1.Compiler.ProtoDefCompiler {
    addTypesToCompilePublic(types) {
        this.addTypesToCompile(types);
    }
}
let cachedCompiledProto = null;
let cachedSerializer = null;
let cachedDeserializer = null;
const getCompiledProto = () => {
    if (!cachedCompiledProto) {
        const compiler = new CustomCompiler();
        compiler.addTypesToCompilePublic(protocol_json_1.default.types);
        compiler.addTypes(require("../datatypes/compiler").default);
        cachedCompiledProto = compiler.compileProtoDefSync();
    }
    return cachedCompiledProto;
};
const createSerializer = () => {
    if (!cachedSerializer)
        cachedSerializer = new protodef_1.Serializer(getCompiledProto(), "mcpe_packet");
    return cachedSerializer;
};
exports.createSerializer = createSerializer;
const createDeserializer = () => {
    if (!cachedDeserializer)
        cachedDeserializer = new Parser(getCompiledProto(), "mcpe_packet");
    return cachedDeserializer;
};
exports.createDeserializer = createDeserializer;
