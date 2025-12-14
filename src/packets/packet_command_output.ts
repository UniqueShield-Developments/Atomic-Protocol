/**
 * CommandOutputPacket
 * Unknown packet ID
 * No description
 */

export interface CommandOutputPacket {
  origin: CommandOrigin;
  output_type: string;
  success_count: number;
  output: { message_id: string; success: boolean; parameters: string[] }[];
  has_data: boolean;
  data: { has_data: "true"; value: string };
}

export interface CommandOrigin {
  origin: string;
  uuid: string;
  request_id: string;
  player_entity_id: number;
}

export const CommandOutputPacketInfo: import("./metadata").PacketMetadata = {
  id: undefined,
  name: "command_output",
  description: undefined,
};
