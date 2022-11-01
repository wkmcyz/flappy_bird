// 8px / frame

// 每秒移动
const MOVE_SPEED_PXPS = 120

// 每帧移动
export const MOVE_SPEED_PXPF = MOVE_SPEED_PXPS / 60

export const TOP_POS_Y = 600
export const SPACE_HEIGHT = 200
export const MIN_TUNNEL_HEIGHT = 100
export const MAX_TUNNEL_HEIGHT = TOP_POS_Y - SPACE_HEIGHT - MIN_TUNNEL_HEIGHT

const TUNNEL_HORIZONTAL_SPACE = 200


export const GEN_TUNNEL_INTERVAL_MS = TUNNEL_HORIZONTAL_SPACE * 1.0 / MOVE_SPEED_PXPS * 1000

// generate and recycle tunnel
export const GEN_TUNNEL_POS_X = 1000
export const RECYCLE_TUNNEL_POS_X = -100

console.log(
    "GEN_TUNNEL_INTERVAL_MS : " + GEN_TUNNEL_INTERVAL_MS
)