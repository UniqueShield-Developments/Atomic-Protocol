/**
 * ServerboundDataStorePacket
 * Unknown packet ID
 * No description
 */

export interface ServerboundDataStorePacket {
  name: string;
  property: string;
  path: string;
  data_type: "double" | "bool" | "string";
  data:
    | { data_type: "double"; value: number }
    | { data_type: "bool"; value: boolean }
    | { data_type: "string"; value: string };
  update_count: number;
}

export const ServerboundDataStorePacketInfo: import("./metadata").PacketMetadata =
  {
    id: undefined,
    name: "serverbound_data_store",
    description: undefined,
  };
