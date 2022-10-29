import * as React from "react"
import { styled } from "@mui/material/styles"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import moment from "moment"
import {
  Button,
  Tooltip,
  Chip,
  Collapse,
  CardActions,
  CardContent,
  CardHeader,
  Card,
  Stack,
} from "@mui/material"

import FaceIcon from "@mui/icons-material/Face"
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining"
import TableBarIcon from "@mui/icons-material/TableBar"
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining"
import { useMutation } from "@blitzjs/rpc"
import updateOrderStatus from "app/orders/mutations/updateOrderStatus"
import DoneIcon from "@mui/icons-material/Done"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CloseIcon from "@mui/icons-material/Close"
import toast from "react-hot-toast"
import { OrderStatusChip } from "app/core/components/Chips/OrderStatusChip"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

function renderChip(info: any) {
  const { deliveryType, tableReference, deliveryReference } = info

  switch (deliveryType) {
    case "place":
      return <Chip icon={<TableBarIcon />} size="small" label={`Mesa ${tableReference}`} />
    case "delivery":
      return (
        <Chip icon={<DeliveryDiningIcon />} size="small" label={`Delivery ${deliveryReference}`} />
      )
    case "takeout":
      return (
        <Chip icon={<TakeoutDiningIcon />} size="small" label={`Retirada ${deliveryReference}`} />
      )
    default:
      return <Chip icon={<FaceIcon />} label="erro" />
  }
}

enum ORDER_STATUS {
  OPEN = "OPEN",
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

const ORDER_STATUS_TRANSLATIONS = {
  OPEN: "ABERTO",
  PREPARING: "PREPARANDO",
  READY: "PRONTO",
  DELIVERED: "ENTREGUE",
  CANCELED: "CANCELADO",
}

export function OrderCard({ info }: any) {
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const [orderInfos, setOrderInfos] = React.useState(info)

  const [updateOrderStatusMutation] = useMutation(updateOrderStatus)

  async function handleOrderStatusChange(status: ORDER_STATUS) {
    try {
      const updated = await updateOrderStatusMutation({
        id: info.id,
        status: status,
      })
      await setOrderInfos(updated)
      toast.success(
        `Status do pedido #${updated.id} atualizado para ${
          ORDER_STATUS_TRANSLATIONS[updated.status]
        } com sucesso!`
      )
    } catch (error: any) {
      toast.success(
        `Um erro ocorreu para atualizar o status do pedido #${info.id}. Tente novamente!`
      )
    }
  }

  return (
    <Card>
      <CardHeader
        action={
          <Stack spacing={1}>
            {renderChip(orderInfos)}
            {OrderStatusChip(orderInfos.status)}
          </Stack>
        }
        title={`Pedido #${info?.id}`}
        subheader={`Solicitado: ${moment(info?.createdAt).fromNow()}`}
      />
      <CardContent style={{ height: "120px", overflow: "auto" }}>
        <Typography variant="body2" color="text.secondary">
          Items:
        </Typography>
        {orderInfos.products.map((product, index) => {
          return (
            <Typography
              variant="body2"
              color="text.secondary"
              key={`listitem-${info.id}-${index}-${product.id}`}
            >
              - {product.itemName}
            </Typography>
          )
        })}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Marcar como cancelado">
          <IconButton
            aria-label="Marcar como cancelado"
            onClick={() => handleOrderStatusChange(ORDER_STATUS.CANCELED)}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Marcar como em preparo">
          <IconButton
            aria-label="Marcar em preparo"
            onClick={() => handleOrderStatusChange(ORDER_STATUS.PREPARING)}
          >
            <AccessTimeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Marcar como pronto">
          <IconButton
            aria-label="Marcar como pronto"
            onClick={() => handleOrderStatusChange(ORDER_STATUS.READY)}
          >
            <DoneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Marcar como entregue">
          <IconButton
            aria-label="Marcar como entregue"
            onClick={() => handleOrderStatusChange(ORDER_STATUS.DELIVERED)}
          >
            <DoneAllIcon />
          </IconButton>
        </Tooltip>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{/*<Typography>{JSON.stringify(info)}</Typography>*/}</CardContent>
      </Collapse>
    </Card>
  )
}
