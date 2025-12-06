/**
 * LessonProgressPacket
 * Packet ID: 183
 * Lesson Progress
 */
export interface LessonProgressPacket {
    action: number;
    score: number;
    identifier: string;
}
export declare const LessonProgressPacketInfo: import("./metadata").PacketMetadata;
