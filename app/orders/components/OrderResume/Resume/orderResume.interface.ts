export interface ComboResumeItem {
  productId: number
  selected: {
    sandwich: {
      itemId: number
      observations: Array<string>
    }
    beverage: {
      itemId: number
      observations: Array<string>
    }
    extra: {
      itemId: number
      observations: Array<string>
    }
  }
  observations: Array<string>
  itemName: string
}

export interface SandwichResumeItem {
  productId: number
  itemId: number
  observations: Array<string>
  itemName: string
}

export interface BeverageResumeItem {
  productId: number
  itemId: number
  observations: Array<string>
  itemName: string
}

export interface OrderResumeItemInterface {
  infos: ComboResumeItem | SandwichResumeItem | BeverageResumeItem
  category: "beverage" | "sandwich" | "extra"
  totalPrice: {
    amount: number
    scale: number
  }
}
