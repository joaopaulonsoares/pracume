export interface ComboResumeItem {
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
  observations: Array<string>
}

export interface SandwichResumeItem {
  itemId: number
  observations: Array<string>
  itemName: string
}

export interface BeverageResumeItem {
  itemId: number
  observations: Array<string>
  itemName: string
}

export interface OrderResumeItemInterface {
  productInformations: Record<any, any>
  selectedInfos: ComboResumeItem | SandwichResumeItem | BeverageResumeItem
  category: "beverage" | "sandwich" | "combo"
  totalPrice: {
    amount: number
    scale: number
  }
}

/*
{
    "uuid": "8fa8d696-0671-4745-b161-104e538e31d5",
    "totalAmount": {
        "value": 3400,
        "scale": 2
    },
    "id": 1,
    "name": "Combo Big Cheddar",
    "category": "combo",
    "items": {
        "main": {
            "type": "sandwich"
        },
        "drink": {
            "type": "beverage"
        },
        "additional": {
            "type": "additional"
        }
    },
    "defaultOptions": {
        "main": 1,
        "drink": 7,
        "additional": 5
    },
    "options": {
        "main": [
            1
        ],
        "drink": [
            7,
            8,
            9,
            10
        ],
        "additional": [
            5
        ]
    },
    "amount": {
        "value": 3400,
        "scale": 2
    }
}

====

{
    "id": 6,
    "name": "Coca Cola Lata",
    "item": 9,
    "category": "beverage",
    "amount": {
        "value": 500,
        "scale": 2
    }
}

*/
