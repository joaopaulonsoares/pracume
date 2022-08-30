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
        name: "Big Cheddar",
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
