import { useState } from "react"
import { Box, Grid, Typography, Tooltip, IconButton, Divider } from "@mui/material"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"
import EditIcon from "@mui/icons-material/Edit"
import ClearIcon from "@mui/icons-material/Clear"
import { BeverageDialog } from "./BeverageDialog"

import { OrderResumeItemInterface, BeverageResumeItem } from "../../Resume/orderResume.interface"

interface BeverageItemInterface {
  productInfo: any
  itemUuid: string
  index: number
  handleRemove: any
  updateObservations: any
  orderItemResume: OrderResumeItemInterface
}

export function BeverageItem({
  productInfo,
  itemUuid,
  index,
  handleRemove,
  updateObservations,
  orderItemResume,
}: BeverageItemInterface) {
  const { name, amount, defaultObservations = [], customObservation } = productInfo

  //const { selectedInfos }: { selectedInfos: BeverageResumeItem } = orderItemResume
  console.log(orderItemResume)
  const selectedInfos = orderItemResume.selectedInfos as BeverageResumeItem

  const listPosition = index + 1
  const [openEdit, setOpenEdit] = useState(false)

  const handleClickEditOpen = () => {
    setOpenEdit(true)
  }

  const handleCloseEditOpen = () => {
    setOpenEdit(false)
  }

  function handleItemRemoval() {
    handleRemove(itemUuid)
  }

  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h5">
            {listPosition} - {selectedInfos.itemName}
          </Typography>

          {selectedInfos.standardObservations.length > 0 && (
            <>
              <Typography key={`default-observation-${itemUuid}-${index}-id`} variant="caption">
                - Obs:{" "}
                {selectedInfos.standardObservations.map((item, index) => `${item.description}, `)}
              </Typography>
              <Typography key={`custom-observation-${itemUuid}-${index}-id`} variant="caption">
                {selectedInfos.observations}
              </Typography>
            </>
          )}
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
      <BeverageDialog
        open={openEdit}
        onClose={handleCloseEditOpen}
        infos={productInfo}
        updateObservations={updateObservations}
        orderItemResume={orderItemResume}
      />
      <Divider />
    </Box>
  )
}
