export interface ComboResumeItemInterface {
  sandwich: {
    itemId: number
    standardObservations: Array<Record<any, any>>
  }
  beverage: {
    itemId: number
    standardObservations: Array<Record<any, any>>
  }
  extra: {
    itemId: number
    standardObservations: Array<Record<any, any>>
  }
  observations: string
}

export interface SandwichResumeItem {
  itemId: number
  observations: string
  standardObservations: Array<Record<any, any>>
  itemName: string
}

export interface BeverageResumeItem {
  itemId: number
  observations: string
  standardObservations: Array<Record<any, any>>
  itemName: string
}

export interface OrderResumeItemInterface {
  productInformations: Record<any, any>
  selectedInfos: BeverageResumeItem | ComboResumeItemInterface | SandwichResumeItem
  category: "beverage" | "sandwich" | "combo"
  totalPrice: {
    value: number
    scale: number
  }
}
