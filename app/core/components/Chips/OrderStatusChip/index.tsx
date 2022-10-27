import { Chip } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import DoneAllIcon from "@mui/icons-material/DoneAll"

export function OrderStatusChip(status: string) {
  switch (status) {
    case "PREPARING":
      return <Chip icon={<AccessTimeIcon />} size="small" color="warning" label="Preparando" />
    case "READY":
      return <Chip icon={<DoneIcon />} size="small" color="info" label="Pronto" />
    case "DELIVERED":
      return <Chip icon={<DoneAllIcon />} size="small" color="success" label="Entregue" />
    case "CANCELED":
      return <Chip icon={<CloseIcon />} size="small" color="error" label="Cancelado" />
    default:
      return <Chip label="Error" />
  }
}
