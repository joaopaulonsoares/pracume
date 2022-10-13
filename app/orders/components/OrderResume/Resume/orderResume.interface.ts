export interface ComboResumeItem {
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
  selectedInfos: BeverageResumeItem | ComboResumeItem | SandwichResumeItem
  category: "beverage" | "sandwich" | "combo"
  totalPrice: {
    value: number
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
