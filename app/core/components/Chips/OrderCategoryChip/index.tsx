import { Chip } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CloseIcon from "@mui/icons-material/Close"

export function OrderCategoryChip(status: string) {
  switch (status) {
    case "combo":
      return <Chip variant="outlined" size="small" label="Combo" />
    case "beverage":
      return <Chip variant="outlined" size="small" label="Bebida" />
    case "sandwich":
      return <Chip variant="outlined" size="small" label="Sanduíche" />
    case "additional":
      return <Chip variant="outlined" size="small" label="Extra" />
    default:
      return <Chip label="Error" />
  }
}
