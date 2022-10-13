import { useState } from "react"
import { Box, Grid, Typography, Tooltip, IconButton, Divider } from "@mui/material"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"
import EditIcon from "@mui/icons-material/Edit"
import ClearIcon from "@mui/icons-material/Clear"
import { ComboEditDialog } from "./ComboEditDialog"

import { items } from "../../../../mockedProducts"

export function ComboOrderItem({
  productInfo,
  itemUuid,
  index,
  handleRemove,
  orderItemResume,
  updateCombo,
}: any) {
  const { productId, name, amount, observations } = productInfo
  const listPosition = index + 1
  const [openEdit, setOpenEdit] = useState(false)

  const { selectedInfos } = orderItemResume

  const mainItem = items.find((element) => element.id === selectedInfos?.sandwich?.itemId)
  const drinkItem = items.find((element) => element.id === selectedInfos?.beverage?.itemId)
  const extraItem = items.find((element) => element.id === selectedInfos?.extra?.itemId)

  const handleClickEditOpen = () => {
    setOpenEdit(true)
  }

  const handleCloseEditOpen = () => {
    setOpenEdit(false)
    //setSelectedValue(value);
  }

  function handleItemRemoval() {
    handleRemove(itemUuid)
  }

  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h5">
            {listPosition} - {name}
          </Typography>

          <Typography key={`order-${itemUuid}-main`} variant="subtitle2" fontSize="small">
            - {mainItem?.name}
          </Typography>
          <Typography key={`order-${itemUuid}-drink`} variant="subtitle2" fontSize="small">
            - {drinkItem?.name}
          </Typography>
          <Typography key={`order-${itemUuid}-additional`} variant="subtitle2" fontSize="small">
            - {extraItem?.name}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" flexDirection="column">
            <Tooltip
              title={`Editar/Adicionar item no produto ${listPosition}`}
              placement="left-start"
            >
              <IconButton
                aria-label="Editar item"
                size="small"
                onClick={() => handleClickEditOpen()}
              >
                <EditIcon sx={{ fontSize: "15px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Remover produto ${listPosition}`} placement="left-start">
              <IconButton
                aria-label="Remover produto"
                size="small"
                color="error"
                onClick={() => handleItemRemoval()}
              >
                <ClearIcon sx={{ fontSize: "15px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="right" margin={0}>
            R$ {formatScaledPriceToPtBr(amount.value, amount.scale)}
          </Typography>
        </Grid>
      </Grid>
      <ComboEditDialog
        open={openEdit}
        onClose={handleCloseEditOpen}
        infos={productInfo}
        orderItemResume={orderItemResume}
        updateCombo={updateCombo}
      />
      <Divider />
    </Box>
  )
}
