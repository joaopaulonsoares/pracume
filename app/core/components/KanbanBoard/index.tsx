import Board from "@asseinfo/react-kanban"
import "@asseinfo/react-kanban/dist/styles.css"

import dynamic from "next/dynamic"
import React from "react"

import { CardItem } from "./CardItem"

const board = {
  columns: [
    {
      id: 1,
      title: "Novos Pedidos",
      cards: [
        {
          id: 1,
          title: "Add card 1",
          description: "Add capability to add a card in a column",
        },
      ],
    },
    {
      id: 2,
      title: "Em preparo",
      cards: [
        {
          id: 2,
          title: "Drag-n-drop support 2",
          description: "Move a card between the columns",
        },
      ],
    },
    {
      id: 3,
      title: "Prontos",
      cards: [
        {
          id: 3,
          title: "Drag-n-drop support 3",
          description: "Move a card between the columns",
        },
      ],
    },
    {
      id: 4,
      title: "Em rota de entrega",
      cards: [
        {
          id: 4,
          title: "Drag-n-drop support 4",
          description: "Move a card between the columns",
        },
      ],
    },
    {
      id: 5,
      title: "Entregues",
      cards: [
        {
          id: 5,
          title: "Drag-n-drop support 5",
          description: "Move a card between the columns",
        },
      ],
    },
  ],
}

const NoSsr = (props) => (
  <React.Fragment>
    <Board
      renderCard={({ content }, { removeCard, dragging }) => (
        <CardItem dragging={dragging}></CardItem>
      )}
    >
      {board}
    </Board>
  </React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
})
