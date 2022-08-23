export function formatScaledPriceToPtBr(price: number, scale: number): string {
  return `${(price / 10 ** scale).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
}
