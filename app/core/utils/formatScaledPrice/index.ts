export function formatScaledPrice(price: number, scale: number): string {
  return `${price / 10 ** scale}`
}
