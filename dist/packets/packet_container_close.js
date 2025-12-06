"use strict";
/**
 * ContainerClosePacket
 * Packet ID: 47
 * After the game deletes the container manager on the client, the client sends this packet.
    Then the server deletes its container manager, and sends a packet back to the client that closes the container screen.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerClosePacketInfo = void 0;
exports.ContainerClosePacketInfo = {
    id: 47,
    name: "container_close",
    description: "After the game deletes the container manager on the client, the client sends this packet.\n\tThen the server deletes its container manager, and sends a packet back to the client that closes the container screen.",
};
