"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeserializer = exports.createSerializer = exports.Codec = void 0;
const atomic_codec_1 = require("atomic-codec");
class Codec {
    createPacketBuffer({ name, params }) {
        const def = atomic_codec_1.PacketRegistry.getByName(name);
        if (!def)
            throw new Error(`Unknown packet name: ${name}`);
        const writer = new atomic_codec_1.BufferWriter();
        writer.writeVarInt(def.id);
        const packet = def.create(params ?? {});
        def.serializer.encode(writer, packet);
        return writer.final();
    }
    parsePacketBuffer(buf) {
        const reader = new atomic_codec_1.BufferReader(buf);
        const id = reader.readVarInt();
        const def = atomic_codec_1.PacketRegistry.getById(id);
        if (!def) {
            return { data: { name: `unknown_${id}`, params: { raw: buf.subarray(reader.position()) } } };
        }
        const params = def.serializer.decode(reader);
        return { data: { name: def.name, params } };
    }
}
exports.Codec = Codec;
const createSerializer = () => new Codec();
exports.createSerializer = createSerializer;
const createDeserializer = () => new Codec();
exports.createDeserializer = createDeserializer;
