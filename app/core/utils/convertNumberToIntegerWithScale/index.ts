export async function convertNumberToIntegerWithScale(
  value: number,
  scale: number
): Promise<number> {
  return value * 10 ** scale
}
