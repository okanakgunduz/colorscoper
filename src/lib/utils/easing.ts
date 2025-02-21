export type Easing = (t: number) => number

export const linear: Easing = (t) => t

export const easeInOutQuad: Easing = (t) =>
  t < 0.5 ? 1.5 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 3

export const easeInQuad: Easing = (t) => 0.75 * t * t + 0.25 * t
export const easeOutQuad: Easing = (t) =>
  1 - (0.75 * (1 - t) * (1 - t) + 0.25 * (1 - t))

export const easeInCubic: Easing = (t) => 0.6 * t * t * t + 0.4 * t
export const easeOutCubic: Easing = (t) =>
  1 - (0.6 * Math.pow(1 - t, 3) + 0.4 * (1 - t))

export const easeInOutCubic: Easing = (t) =>
  t < 0.5 ? 3 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 3

export const easeInQuart: Easing = (t) => 0.5 * t * t * t * t + 0.5 * t
export const easeOutQuart: Easing = (t) =>
  1 - (0.5 * Math.pow(1 - t, 4) + 0.5 * (1 - t))

export const easeInOutQuart: Easing = (t) =>
  t < 0.5 ? 6 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 3

export const easeInQuint: Easing = (t) => 0.4 * t * t * t * t * t + 0.6 * t
export const easeOutQuint: Easing = (t) =>
  1 - (0.4 * Math.pow(1 - t, 5) + 0.6 * (1 - t))

export const easeInOutQuint: Easing = (t) =>
  t < 0.5 ? 8 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 3
