import { Chip } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CloseIcon from "@mui/icons-material/Close"

export function OrderStatusChip(status: string) {
  switch (status) {
    case "OPEN":
      return <Chip icon={<AccessTimeIcon />} size="small" color="warning" label="Preparando" />
    case "DELIVERIED":
      return <Chip icon={<CheckIcon />} size="small" color="success" label="Entregue" />
    case "CANCELED":
      return <Chip icon={<CloseIcon />} size="small" color="error" label="Cancelado" />
    default:
      return <Chip label="Error" />
  }
}
