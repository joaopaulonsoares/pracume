[![Blitz.js](https://raw.githubusercontent.com/blitz-js/art/master/github-cover-photo.png)](https://blitzjs.com)

This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# ****name****

## Getting Started

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/pracume
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/pracume_test
```

## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## Próximos passos!

- CRIAR MODAL PARA ESCOLHER O TIPO DO PEDIDO (COMANDA, DELIVERY, RETIRADA) ANTES DE REDIRECIONAR PARA A TELA DE ESCOLHER ITENS -> USAR NA URL UM PARÂMETRO QUE PODERA SER LIDO NA HORA DE SALVAR
- SALVAR NOVO PEDIDO DE ACORDO COM O TIPO ESCOLHIDO (INICIALMENTE FOCANDO EM RETIRADA)
- LISTAR TODOS OS PEDIDOS FEITOS
- LISTAR TODOS OS PEDIDOS ATUALMENTE ATIVOS
- CRIAR FILTRO PARA PEDIDOS ATIVOS DE ACORDO COM O TIPO (RETIRADA, DELIVERY, LOCAL)
- IMPRIMIR PEDIDO NA HORA QUE FOI FEITO (IMPRIMIR ATÉ 3 COMANDAS DIFERENTES DE ACORDO COM O TIPO) CONTENDO SOMENTE DADOS NECESSÁRIOS PARA QUE SEJAM FEITOS/ENTREGUES
- CRUD DE COMANDAS


