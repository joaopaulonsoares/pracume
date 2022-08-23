export function convertNumberFromIntegerWithScaleToFloat(value: number, scale: number): number {
  return value / 10 ** scale
}
