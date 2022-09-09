import { formatScaledPriceToPtBr } from "../formatScaledPriceToPtBr"

export function calculateTotalSelectedItemsPrice(listToSum: any) {
  const sum = listToSum.reduce(
    (previousValue, currentItem) => previousValue + currentItem.amount.value,
    0
  )
  return formatScaledPriceToPtBr(sum, 2)
}
