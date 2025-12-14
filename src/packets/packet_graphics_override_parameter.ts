/**
 * GraphicsOverrideParameterPacket
 * Packet ID: 331
 * Sent from the server to the client when a server script changes the rendering settings
 */

export interface GraphicsOverrideParameterPacket {
  values: ParameterKeyframeValue[];
  biome_identifier: string;
  parameter_type: GraphicsOverrideParameterType;
  reset: boolean;
}

export interface ParameterKeyframeValue {
  time: number;
  value: Vec3f;
}

export type GraphicsOverrideParameterType =
  | "sky_zenith_color"
  | "sky_horizon_color"
  | "horizon_blend_min"
  | "horizon_blend_max"
  | "horizon_blend_start"
  | "horizon_blend_mie_start"
  | "rayleigh_strength"
  | "sun_mie_strength"
  | "moon_mie_strength"
  | "sun_glare_shape";

export interface Vec3f {
  x: number;
  y: number;
  z: number;
}

export const GraphicsOverrideParameterPacketInfo: import("./metadata").PacketMetadata =
  {
    id: 331,
    name: "graphics_override_parameter",
    description:
      "Sent from the server to the client when a server script changes the rendering settings",
  };
