// Categories: sandwich, beverage, additional, extra

export const comboList = [
  {
    productId: 1,
    name: "Combo Big Cheddar",
    type: "combo",
    amount: {
      value: 1700,
      scale: 2,
    },
    items: [
      {
        productId: 3,
        name: "Big Cheddar",
        type: "sandwich",
        amount: {
          value: 0,
          scale: 2,
        },
      },
      {
        productId: 10,
        name: "Batata frita",
        type: "additional",
        amount: {
          value: 0,
          scale: 2,
        },
      },
      {
        productId: 9,
        name: "Suco Laranja 300",
        type: "beverage",
        amount: {
          value: 0,
          scale: 2,
        },
      },
    ],
  },
  {
    productId: 2,
    name: "Combo Big Cheff",
    type: "combo",
    amount: {
      value: 1200,
      scale: 2,
    },
    items: [
      {
        name: "Big Cheff",
        type: "sandwich",
        amount: {
          value: 0,
          scale: 2,
        },
      },
      {
        name: "Batata frita",
        type: "additional",
        amount: {
          value: 0,
          scale: 2,
        },
      },
      {
        name: "Suco Maracuja 300",
        type: "beverage",
        amount: {
          value: 0,
          scale: 2,
        },
      },
    ],
  },
]

export const sandwichesList = [
  {
    productId: 3,
    type: "sandwich",
    name: "Big Picanha",
    amount: {
      value: 2100,
      scale: 2,
    },
    items: [],
  },
  {
    productId: 4,
    type: "sandwich",
    name: "Big Cheddar",
    amount: {
      value: 2200,
      scale: 2,
    },
    items: [],
  },
  {
    productId: 5,
    type: "sandwich",
    name: "Big Filé",
    amount: {
      value: 700,
      scale: 2,
    },
    items: [],
  },
]

export const sandwichesObject = {
  1: {
    productId: 3,
    type: "sandwich",
    name: "Big Picanha",
    amount: {
      value: 2100,
      scale: 2,
    },
    items: [],
  },
  2: {
    productId: 4,
    type: "sandwich",
    name: "Big Cheddar",
    amount: {
      value: 2200,
      scale: 2,
    },
    items: [],
  },
  3: {
    productId: 5,
    type: "sandwich",
    name: "Big Filé",
    amount: {
      value: 700,
      scale: 2,
    },
    items: [],
  },
}

export const beverageList = [
  {
    productId: 6,
    type: "beverage",
    name: "Cerveja Skol Lata",
    amount: {
      value: 1200,
      scale: 2,
    },
    items: [],
  },
  {
    productId: 7,
    type: "beverage",
    name: "Coca Cola Lata",
    amount: {
      value: 1400,
      scale: 2,
    },
    items: [],
  },
  {
    productId: 8,
    type: "beverage",
    name: "Coca KS",
    amount: {
      value: 500,
      scale: 2,
    },
    items: [],
  },
  {
    productId: 9,
    type: "beverage",
    name: "Guaraná Lata",
    amount: {
      value: 500,
      scale: 2,
    },
    items: [],
    baseAmount: {
      value: 500,
      scale: 2,
    },
  },
]

const mockedJuices = [
  {
    productId: 11,
    type: "beverage",
    name: "Suco de Maracujá",
    amount: {
      value: 0,
      scale: 2,
    },
    items: [],
    sizeOptions: [
      {
        name: "300",
        size: 500,
        amount: {
          value: 1200,
          scale: 2,
        },
      },
      {
        name: "500",
        size: 500,
        amount: {
          value: 1400,
          scale: 2,
        },
      },
    ],
  },
]

export const mockedProducts = {
  combos: comboList,
  sandwiches: sandwichesList,
  beverages: beverageList,
  juices: mockedJuices,
}

export const items = {
  1: {
    id: 1,
    category: "sandwich",
    name: "Big Cheddar",
    ingredients: [],
  },
  2: {
    id: 2,
    category: "sandwich",
    name: "Big Mac",
    ingredients: [],
  },
  3: {
    id: 3,
    category: "sandwich",
    name: "Big Ervas",
    ingredients: [],
  },
  4: {
    id: 4,
    category: "sandwich",
    name: "Cheff Burger",
    ingredients: [],
  },
  5: {
    id: 5,
    category: "additional",
    name: "Batata Frita",
    ingredients: [],
  },
  6: {
    id: 6,
    category: "additional",
    name: "Batata Assada",
    ingredients: [],
  },
  7: {
    id: 7,
    category: "beverage",
    name: "Suco de Laranja",
    ingredients: [],
  },
  8: {
    id: 8,
    category: "beverage",
    name: "Guaraná Lata",
    ingredients: [],
  },
  9: {
    id: 9,
    category: "beverage",
    name: "Coca Cola Lata",
    ingredients: [],
  },
  10: {
    id: 10,
    category: "beverage",
    name: "Suco de Maracujá",
    ingredients: [],
  },
  11: {
    id: 11,
    category: "beverage",
    name: "Creme de Morango",
    ingredients: [],
  },
}

export const products = [
  // Combos
  {
    id: 1,
    name: "Combo Big Cheddar",
    category: "combo",
    items: {
      item1: { type: "sandwich", title: "Sanduíche" },
      item2: { type: "beverage", title: "Bebida" },
      item3: { type: "additional", title: "Item complementar" },
    },
    defaultOptions: {
      item1: 1,
      item2: 7,
      item3: 5,
    },
    options: {
      item1: [1],
      item2: [7, 8, 9, 10],
      item3: [5],
      extras: [],
    },
    value: {
      amount: 3400,
      scale: 2,
    },
  },
  {
    id: 2,
    name: "Combo Big Cheff",
    category: "combo",
    items: {
      item1: { type: "sandwich", required: true, title: "Sanduíche" },
      item2: { type: "beverage", required: true, title: "Bebida" },
      item3: { type: "additional", required: true, title: "Item complementar" },
    },
    defaultOptions: {
      item1: 4,
      item2: 7,
      item3: 5,
    },
    options: {
      item1: [4],
      item2: [7, 8, 9, 10],
      item3: [5],
      extras: [],
    },
    value: {
      amount: 4200,
      scale: 2,
    },
  },
  // Sanduiches
  {
    id: 3,
    name: "Big Cheff",
    category: "sandwich",
    items: { item1: { type: "sandwich", required: true, title: "Sanduíche" } },
    defaultOptions: {
      item1: 4,
    },
    options: {
      item1: [4],
      extras: [],
    },
    value: {
      amount: 2300,
      scale: 2,
    },
  },
  {
    id: 4,
    name: "Big Cheddar",
    category: "sandwich",
    items: { item1: { type: "sandwich", required: true, title: "Sanduíche" } },
    defaultOptions: {
      item1: 1,
    },
    options: {
      item1: [4],
      extras: [],
    },
    value: {
      amount: 2300,
      scale: 2,
    },
  },
  // Custom Drinks
  {
    id: 5,
    name: "Suco de Maracujá",
    category: "customDrink",
    items: [{ productId: 10, type: "juice", required: true, title: "Sabor" }],
    options: [
      {
        size: "300",
        measureUnit: "ml",
        value: {
          amount: 1000,
          scale: 2,
        },
      },
      {
        size: "500",
        measureUnit: "ml",
        value: {
          amount: 1400,
          scale: 2,
        },
      },
    ],
  },
  {
    id: 6,
    name: "Creme de Morango",
    category: "customDrink",
    items: [{ productId: 11, type: "cream", required: true, title: "Sabor" }],
    options: [
      {
        size: "300",
        measureUnit: "ml",
        value: {
          amount: 1400,
          scale: 2,
        },
      },
      {
        size: "500",
        measureUnit: "ml",
        value: {
          amount: 1700,
          scale: 2,
        },
      },
    ],
  },
  // Industrialized drink
  {
    id: 6,
    name: "Coca Cola Lata",
    items: { item1: { type: "beverave", required: true, title: "Refrigerante" } },
    defaultOptions: {
      item1: 9,
    },
    options: {
      item1: [9],
      extras: [],
    },
    value: {
      amount: 500,
      scale: 2,
    },
  },
]
