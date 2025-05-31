export default function hexToAngle(q: number, r: number, s: number) {
  if (q === 0 && r === 0 && s === 0) return 0 // Center point

  // Convert to cartesian coordinates
  const x = (3 / 2) * q
  const y = Math.sqrt(3) * (r + q / 2)

  // Calculate angle in radians
  let angle = Math.atan2(y, x)

  // Convert to degrees and normalize to [0, 360)
  angle = ((angle * 180) / Math.PI + 360) % 360

  return angle
}
