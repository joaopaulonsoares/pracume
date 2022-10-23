import * as React from "react"
import router from "next/router"
import moment from "moment"
import { Routes } from "@blitzjs/next"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  Chip,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import TableBarIcon from "@mui/icons-material/TableBar"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export function OrderPadCard({ orderPadInfo }: any) {
  const { id, createdAt, tableReference, holderName, orders } = orderPadInfo

  return (
    <Card>
      <CardHeader
        action={
          <>
            <Chip icon={<TableBarIcon />} label={`Mesa ${tableReference}`} />
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </>
        }
        title={holderName}
        subheader={`Hora de registro ${moment(createdAt).format("LT")}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Pedidos feitos: {orders.length}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="make order">
          <ShoppingCartIcon onClick={() => router.push(Routes.NewOrderPage())} />
        </IconButton>
        <div style={{ marginLeft: "auto" }}>
          <Button
            endIcon={<ArrowRightAltIcon />}
            onClick={() => router.push(Routes.ShowOrderPadPage({ orderPadId: id }))}
          >
            Ver comanda
          </Button>
        </div>
      </CardActions>
    </Card>
  )
}
