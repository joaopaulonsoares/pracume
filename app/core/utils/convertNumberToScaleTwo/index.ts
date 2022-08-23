export async function convertNumberToScale(value: number, scale: number): Promise<number> {
  console.log(value * 10 ** scale)
  return value * 10 ** scale
}
