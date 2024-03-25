export const GAME_TYPE = {
  MINECRAFT: "MINECRAFT",
  PALWORLD: "PALWORLD"
} as const;

export const GAME_TYPE_URI = {
  MINECRAFT: import.meta.env.VITE_RCON_API_WS_MINECRAFT_URI,
  PALWORLD: import.meta.env.VITE_RCON_API_WS_PALWORLD_URI
} as const;
