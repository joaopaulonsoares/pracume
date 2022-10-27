import * as React from "react"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import moment from "moment"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"

import { OrderStatusChip } from "app/core/components/Chips/OrderStatusChip"
import { OrderCategoryChip } from "app/core/components/Chips/OrderCategoryChip"

function Row(props: { row }) {
  const { row } = props
  const { products, amount, id, createdAt, deliveryTime, status } = row
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell># {id}</TableCell>
        <TableCell align="center">{moment(createdAt).format("LTS")}</TableCell>
        <TableCell align="center">-</TableCell>
        <TableCell align="center">{products.length} items</TableCell>
        <TableCell>{OrderStatusChip(status)}</TableCell>
        <TableCell align="center">{formatScaledPriceToPtBr(amount)}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Itens do pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell align="right">Preço (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((historyRow, index) => (
                    <TableRow key={`product-item-${id}-${index}`}>
                      <TableCell component="th" scope="row">
                        {historyRow.itemName}
                      </TableCell>
                      <TableCell>{OrderCategoryChip(historyRow.category)}</TableCell>
                      <TableCell align="right">
                        {formatScaledPriceToPtBr(historyRow.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export function CollapsibleTable({ orderPadInfo }: any) {
  const { orders } = orderPadInfo
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Número pedido</TableCell>
            <TableCell>Hora do pedido</TableCell>
            <TableCell>Hora da entrega</TableCell>
            <TableCell>Quantidade de itens</TableCell>
            <TableCell>Situação</TableCell>
            <TableCell>Preço(R$)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row, index) => (
            <Row key={`index-${index}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
