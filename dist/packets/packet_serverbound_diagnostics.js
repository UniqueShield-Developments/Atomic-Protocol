"use strict";
/**
 * ServerboundDiagnosticsPacket
 * Packet ID: 315
 * Sent from the client to the server IF ProfilerLite is enabled AND the creator toggle for additional client telemetry is enabled AND new telemetry data is ready (every 500 ms).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerboundDiagnosticsPacketInfo = void 0;
exports.ServerboundDiagnosticsPacketInfo = {
    id: 315,
    name: "serverbound_diagnostics",
    description: "Sent from the client to the server IF ProfilerLite is enabled AND the creator toggle for additional client telemetry is enabled AND new telemetry data is ready (every 500 ms).",
};
