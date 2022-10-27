import * as React from "react"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import moment from "moment"

import Chip from "@mui/material/Chip"
import FaceIcon from "@mui/icons-material/Face"
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining"
import TableBarIcon from "@mui/icons-material/TableBar"
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining"
import { Divider } from "@mui/material"

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

export function OrderCard({ info }: any) {
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card>
      <CardHeader
        action={renderChip(info)}
        title={`Pedido #${info?.id}`}
        subheader={`Solicitado: ${moment(info?.createdAt).fromNow()}`}
      />
      <CardContent style={{ height: "120px", overflow: "auto" }}>
        <Typography variant="body2" color="text.secondary">
          Items:
        </Typography>
        {info.products.map((product, index) => {
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
        <Typography variant="body2" color="text.secondary">
          Registrado por: João
        </Typography>
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
        <CardContent>
          <Typography>{JSON.stringify(info)}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
