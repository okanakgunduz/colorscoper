import chroma from "chroma-js"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { PADDING } from "./constants"

export interface CellsInfo {
  x: number
  y: number
  count: number
}

export const getCells = (
  width: number,
  height: number,
  size: number,
): CellsInfo => {
  const x = Math.floor((width - PADDING.x * 2) / size) & ~1
  const y = Math.floor((height - PADDING.y * 2) / size)

  if (width === 0 && height === 0)
    return {
      x: 0,
      y: 0,
      count: 0,
    }

  return {
    x,
    y,
    count: x * y,
  }
}

export const luminosityScale = chroma.scale(["#e0e0e0", "#4a4a4a"]).mode("hsi")

export const getGridHueLum = (
  cells: CellsInfo,
  i: number,
): { hue: number; luminosity: number } => {
  const { x, y } = linearTo2D(i, cells.x)

  const hue =
    x < Math.floor(cells.x / 2)
      ? map(y, 0, cells.y - 1, 0, 150)
      : map(y, 0, cells.y - 1, 330, 180)

  const normalizedX =
    x < Math.floor(cells.x / 2)
      ? x / (cells.x / 2 - 1)
      : 1 - (x - cells.x / 2) / (cells.x / 2 - 1)

  const luminosity = luminosityScale(normalizedX).luminance()

  return { hue, luminosity }
}
