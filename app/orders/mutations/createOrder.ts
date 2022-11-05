import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"
import { items } from "../mockedProducts"
import { e } from "@blitzjs/auth/dist/index-57d74361"

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

interface SearchedComboItem {
  category: string
  id: number
  ingredients: Array<any>
  name: string
}

function comboParser(orderItem: any): Array<OrderItem> {
  const { selectedInfos } = orderItem
  console.log()

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
      itemId: mainItem.id,
      itemName: mainItem.name,
      observations: "",
      category: mainItem.category,
      amount: orderItem.totalAmount.value * 0.4,
    },
    {
      itemId: drinkItem.id,
      itemName: drinkItem.name,
      observations: "",
      category: drinkItem.category,
      amount: orderItem.totalAmount.value * 0.3,
    },
    {
      itemId: extraItem.id,
      itemName: extraItem.name,
      observations: "",
      category: extraItem.category,
      amount: orderItem.totalAmount.value * 0.3,
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
  //productsResumed
  console.log(input.selectedProducts)

  const productsResumed = input.selectedProducts.map((item) => {
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      amount: item.totalAmount,
    }
  }) as Prisma.JsonArray

  const itemsParsedArray = input.selectedProducts.reduce((previousValue, currentItem) => {
    if (currentItem.category === "combo") {
      const item = comboParser(currentItem)
      const temp = [...previousValue, ...item]
      return temp
    } else {
      const item = itemParser(currentItem)
      const temp = [...previousValue, item]
      return temp
    }
  }, []) as Prisma.JsonArray

  const itensAmount = await input.selectedProducts.reduce(
    (previousValue, currentItem) => previousValue + currentItem.amount.value,
    0
  )

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const order = await db.order.create({
    data: {
      cashRegisterId: input.cashRegisterId,
      deliveryType: input.deliveryType,
      amount: itensAmount,
      tableReference: input.tableReference,
      deliveryReference: "",
      products: itemsParsedArray,
      productsResumed: productsResumed,
      ...(input.orderPadId > 0 && { orderPadId: Number(input.orderPadId) }),
    },
  })

  return order
})
