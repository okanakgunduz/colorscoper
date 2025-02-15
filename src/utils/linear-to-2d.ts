export default function linearTo2D(index: number, x: number) {
  return {
    x: index % x,
    y: Math.floor(index / x),
  }
}
