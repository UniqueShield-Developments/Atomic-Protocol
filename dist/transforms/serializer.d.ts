import { FullPacketParser, Serializer } from "protodef";
declare class Parser extends FullPacketParser {
}
export declare const createSerializer: () => Serializer;
export declare const createDeserializer: () => Parser;
export {};
