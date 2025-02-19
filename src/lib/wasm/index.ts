// @ts-expect-error no type inference from zig
import { exports } from "./generate-hex-pyramid.zig?instantiate"

export type Hexagon = {
  points: [number, number][]
}

interface Export {
  generateHexPyramid: (svgWidth: number, size: number, gap: number) => number
  freeHexPyramid: (ptr: number) => void
  memory: ArrayBufferLike
}

const typed = exports as Export

export const generateHexPyramid = ({
  svgWidth,
  size,
  gap,
}: {
  svgWidth: number
  size: number
  gap: number
}): { ptr: number; hexagons: Hexagon[]; svgHeight: number } => {
  const ptr = typed.generateHexPyramid(svgWidth, size, gap)

  if (ptr === 0) {
    throw new Error("Failed to allocate memory for hexagons")
  }

  const mem = new DataView(exports.memory.buffer)

  const hexagonsPtr = mem.getUint32(ptr, true) // hexagons.ptr at offset 0
  const hexagonsLen = mem.getUint32(ptr + 4, true) // hexagons.len at offset 4
  const svgHeight = mem.getUint16(ptr + 8, true) // svgHeight at offset 8

  const hexagons: Hexagon[] = []
  const hexagonSize = 6 * 2 * 2 // 6 points * 2 u16 * 2 bytes

  for (let i = 0; i < hexagonsLen; i++) {
    const pointsOffset = hexagonsPtr + i * hexagonSize
    const pointsBuffer = new Uint16Array(
      exports.memory.buffer,
      pointsOffset,
      12,
    )
    const points: [number, number][] = []
    for (let j = 0; j < 12; j += 2) {
      points.push([pointsBuffer[j], pointsBuffer[j + 1]])
    }
    hexagons.push({ points })
  }

  return { ptr, hexagons, svgHeight }
}

export const freeHexPyramid = (ptr: number) => {
  if (ptr !== 0) typed.freeHexPyramid(ptr)
}
