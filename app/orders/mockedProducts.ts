// Categories: sandwich, beverage, additional, extra

export const items = [
  {
    id: 1,
    category: "sandwich",
    name: "Big Cheddar",
    ingredients: [],
  },
  {
    id: 2,
    category: "sandwich",
    name: "Big Mac",
    ingredients: [],
  },
  {
    id: 3,
    category: "sandwich",
    name: "Big Ervas",
    ingredients: [],
  },
  {
    id: 4,
    category: "sandwich",
    name: "Cheff Burger",
    ingredients: [],
  },
  {
    id: 5,
    category: "additional",
    name: "Batata Frita",
    ingredients: [],
  },
  {
    id: 6,
    category: "additional",
    name: "Batata Assada",
    ingredients: [],
  },
  {
    id: 7,
    category: "beverage",
    name: "Suco de Laranja",
    ingredients: [],
  },
  {
    id: 8,
    category: "beverage",
    name: "Guaraná Lata",
    ingredients: [],
  },
  {
    id: 9,
    category: "beverage",
    name: "Coca Cola Lata",
    ingredients: [],
  },
  {
    id: 10,
    category: "beverage",
    name: "Suco de Maracujá",
    ingredients: [],
  },
  {
    id: 11,
    category: "beverage",
    name: "Creme de Morango",
    ingredients: [],
  },
]

export const extraItemsProducts = [
  {
    id: 1,
    name: "Apresuntado",
    forCategory: "sandwich",
    amount: {
      value: 300,
      scale: 2,
    },
  },
  {
    id: 2,
    name: "Bacon",
    forCategory: "sandwich",
    amount: {
      value: 300,
      scale: 2,
    },
  },
  {
    id: 3,
    name: "Salsicha",
    forCategory: "sandwich",
    amount: {
      value: 200,
      scale: 2,
    },
  },
  {
    id: 4,
    name: "Ovo",
    forCategory: "sandwich",
    amount: {
      value: 200,
      scale: 2,
    },
  },
  {
    id: 5,
    name: "Mussarela",
    forCategory: "sandwich",
    amount: {
      value: 300,
      scale: 2,
    },
  },
  {
    id: 6,
    name: "Queijo Cheddar",
    forCategory: "sandwich",
    amount: {
      value: 300,
      scale: 2,
    },
  },
]

export const productsNewList = [
  // Combos
  {
    id: 1,
    name: "Combo Big Cheddar",
    category: "combo",
    items: {
      sandwich: { type: "sandwich", title: "Sanduíche Big Cheddar" },
      drink: { type: "beverage", title: "Bebida" },
      additional: { type: "additional", title: "Item complementar" },
    },
    defaultOptions: {
      sandwich: 1,
      drink: 7,
      additional: 5,
    },
    options: {
      sandwich: [1],
      drink: [7, 8, 9, 10],
      additional: [5],
    },
    amount: {
      value: 3400,
      scale: 2,
    },
  },
  {
    id: 2,
    name: "Combo Big Cheff",
    category: "combo",
    items: {
      sandwich: { type: "sandwich", required: true, title: "Sanduíche Big Cheff" },
      drink: { type: "beverage", required: true, title: "Bebida Maracujá 300ml" },
      additional: { type: "additional", required: true, title: "Item complementar" },
    },
    defaultOptions: {
      sandwich: 4,
      drink: 7,
      additional: 5,
    },
    options: {
      sandwich: [4],
      drink: [7, 8, 9, 10],
      additional: [5],
    },
    amount: {
      value: 4200,
      scale: 2,
    },
  },
  // Sanduiches
  {
    id: 3,
    name: "Big Cheff",
    category: "sandwich",
    item: 4,
    amount: {
      value: 2300,
      scale: 2,
    },
  },
  {
    id: 4,
    name: "Big Cheddar",
    category: "sandwich",
    item: 4,
    amount: {
      value: 2300,
      scale: 2,
    },
  },
  // Custom Drinks
  {
    id: 5,
    name: "Suco de Maracujá",
    category: "customBeverage",
    item: 10,
    options: [
      {
        size: "300",
        measureUnit: "ml",
        amount: {
          value: 1000,
          scale: 2,
        },
      },
      {
        size: "500",
        measureUnit: "ml",
        amount: {
          value: 1400,
          scale: 2,
        },
      },
    ],
  },
  {
    id: 6,
    name: "Creme de Morango",
    category: "customBeverage",
    item: 11,
    options: [
      {
        size: "300",
        measureUnit: "ml",
        amount: {
          value: 1400,
          scale: 2,
        },
      },
      {
        size: "500",
        measureUnit: "ml",
        amount: {
          value: 1700,
          scale: 2,
        },
      },
    ],
  },
  // Industrialized drink
  {
    id: 6,
    name: "Coca Cola Lata",
    item: 9,
    category: "beverage",
    amount: {
      value: 500,
      scale: 2,
    },
  },
  {
    id: 7,
    name: "Guaraná Lata",
    category: "beverage",
    item: 8,
    amount: {
      value: 500,
      scale: 2,
    },
  },
]
