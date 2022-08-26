export const comboList = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    type: "sandwich",
    name: "Big Picanha",
    amount: {
      value: 2100,
      scale: 2,
    },
    items: [],
  },
  {
    id: 4,
    type: "sandwich",
    name: "Big Cheddar",
    amount: {
      value: 2200,
      scale: 2,
    },
    items: [],
  },
  {
    id: 5,
    type: "sandwich",
    name: "Big Filé",
    amount: {
      value: 700,
      scale: 2,
    },
    items: [],
  },
]

export const beverageList = [
  {
    id: 6,
    type: "beverage",
    name: "Suco de Maracujá 300",
    amount: {
      value: 1200,
      scale: 2,
    },
    items: [],
  },
  {
    id: 7,
    type: "beverage",
    name: "Suco Maracujá 500",
    amount: {
      value: 1400,
      scale: 2,
    },
    items: [],
  },
  {
    id: 8,
    type: "beverage",
    name: "Coca KS",
    amount: {
      value: 500,
      scale: 2,
    },
    items: [],
  },
  {
    id: 9,
    type: "beverage",
    name: "Guaraná Lata",
    amount: {
      value: 400,
      scale: 2,
    },
    items: [],
  },
]

export const mockedProducts = {
  combos: comboList,
  sandwiches: sandwichesList,
  beverages: beverageList,
}