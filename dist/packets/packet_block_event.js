"use strict";
/**
 * BlockEventPacket
 * Packet ID: 26
 * Whenever a block event happens it is sent from the server to sync client and server, with arbitrarily encoded information in b0 and b1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockEventPacketInfo = void 0;
exports.BlockEventPacketInfo = {
    id: 26,
    name: "block_event",
    description: "Whenever a block event happens it is sent from the server to sync client and server, with arbitrarily encoded information in b0 and b1.",
};
