import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"
import { items } from "../mockedProducts"

interface OrderItem {
  itemId: number
  itemName: string
  observations: string
  category: string
  amount: number
}

interface Order {
  totalAmount: number
  items: Array<OrderItem>
}

/*
category
:
"sandwich"
id
:
4
ingredients
:
[]
name
:
"Cheff Burger"
*/

interface SearchedComboItem {
  category: string
  id: number
  ingredients: Array<any>
  name: string
}

function comboParser(orderItem: any): Array<OrderItem> {
  let parsedItems = []

  const { id, totalAmount, name, category, selectedInfos } = orderItem

  const mainItem = items.find(
    (element) => element.id === selectedInfos?.sandwich?.itemId
  ) as SearchedComboItem
  const drinkItem = items.find(
    (element) => element.id === selectedInfos?.beverage?.itemId
  ) as SearchedComboItem
  const extraItem = items.find(
    (element) => element.id === selectedInfos?.extra?.itemId
  ) as SearchedComboItem

  return [
    {
      itemId: id,
      itemName: name,
      observations: "",
      category,
      amount: totalAmount.value,
    },
    {
      itemId: mainItem.id,
      itemName: mainItem.name,
      observations: "",
      category: mainItem.category,
      amount: 0,
    },
    {
      itemId: drinkItem.id,
      itemName: drinkItem.name,
      observations: "",
      category: drinkItem.category,
      amount: 0,
    },
    {
      itemId: extraItem.id,
      itemName: extraItem.name,
      observations: "",
      category: extraItem.category,
      amount: 0,
    },
  ]
}

function itemParser(item: any): OrderItem {
  const { id, totalAmount, name, category, selectedInfos } = item
  const { standardObservations, observations } = selectedInfos
  const parsedDefObs = standardObservations.join()

  return {
    itemId: id,
    itemName: name,
    observations: `${parsedDefObs}, ${observations}`,
    category,
    amount: totalAmount.value,
  }
}

export default resolver.pipe(resolver.authorize(), async (input: any) => {
  // Somar todos os itens
  let totalAmount = 0

  const sum = input.reduce(
    (previousValue, currentItem) => previousValue + currentItem.amount.value,
    0
  )
  console.log(sum)

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  //const order = await db.order.create({ data: input })
  console.log("oi")
  console.log(input)
  //return order
  return {}
})
