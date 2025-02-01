/**
 * This is a function to convert integers to Roman Numerals.
 * @param num Number to convert to Roman Numerals
 * @returns Roman Numerals of the input
 */

export default function romanize(num: number): string {
  if (num === 0) {
    return "0"
  }

  const romanValues: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }

  let roman = ""

  for (const key in romanValues) {
    const value = romanValues[key]
    while (num >= value) {
      roman += key
      num -= value
    }
  }

  return roman
}
