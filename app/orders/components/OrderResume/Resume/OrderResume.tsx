import { ArrowForwardTwoTone } from "@mui/icons-material"
import { Box, Card, CardHeader, Divider, Typography, Button } from "@mui/material"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"
import { ComboOrderItem } from "app/orders/components/OrderResume/Items/Combo/ComboItem"
import { DefaultOrderItem } from "app/orders/components/OrderResume/Items/Default/DefaultItem"
import { SandwichItem } from "app/orders/components/OrderResume/Items/Sandwich/SandwichItem"
import { BeverageItem } from "app/orders/components/OrderResume/Items/Beverage/BeverageItem"
import { Categories } from "app/core/enums/categories.enum"
import toast from "react-hot-toast"

export function OrderResume({ selectedProducts, handleSelectedRemove, handleItemEdit }: any) {
  function handleRemove(itemUuid: string) {
    handleSelectedRemove(itemUuid)
  }

  function OrderSelectedProduct({ itemInfo, index }: any) {
    const { uuid, ...productInfo } = itemInfo

    function updateObservations(defaultObservations = "", customObservation) {
      for (const item of selectedProducts) {
        if (item.uuid === uuid) {
          item.selectedInfos.observations = customObservation
          item.selectedInfos.standardObservations = defaultObservations
          toast.success("Informações atualizadas com sucesso!")
          break
        }
      }
    }

    function updateCombo(infos: any) {
      for (const item of selectedProducts) {
        if (item.uuid === uuid) {
          item.selectedInfos.sandwich.standardObservations = infos.sandwich.standardObservations
          item.selectedInfos.beverage.itemId = infos.beverage.itemId
          item.selectedInfos.beverage.standardObservations = infos.beverage.standardObservations
          item.selectedInfos.extra.itemId = infos.extra.itemId
          item.selectedInfos.extra.standardObservations = infos.extra.standardObservations
          item.selectedInfos.observations = infos.observations
          toast.success("Informações atualizadas com sucesso!")
          break
        }
      }
    }

    switch (productInfo.category) {
      case Categories.COMBO:
        return (
          <ComboOrderItem
            productInfo={itemInfo}
            itemUuid={uuid}
            index={index}
            handleRemove={handleRemove}
            orderItemResume={itemInfo}
            updateCombo={updateCombo}
          />
        )
      case Categories.SANDWICH:
        return (
          <SandwichItem
            itemUuid={uuid}
            index={index}
            handleRemove={handleRemove}
            updateObservations={updateObservations}
            orderItemResume={itemInfo}
          />
        )
      case Categories.BEVERAGE:
        return (
          <BeverageItem
            itemUuid={uuid}
            index={index}
            handleRemove={handleRemove}
            updateObservations={updateObservations}
            orderItemResume={itemInfo}
          />
        )
      default:
        return (
          // Not been used
          <DefaultOrderItem
            productInfo={itemInfo}
            itemUuid={uuid}
            index={index}
            handleRemove={handleRemove}
          />
        )
    }
  }

  return (
    <Box
      paddingBottom={1}
      maxHeight="580px" // fixed the height: ;
      style={{
        //border: "2px solid black",
        overflow: "hidden",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      {selectedProducts.length === 0 ? (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={1}
        >
          <Typography variant="subtitle1">Nenhum produto escolhido</Typography>
        </Box>
      ) : (
        selectedProducts.map((item, index) => (
          <OrderSelectedProduct
            key={`selected-product-${item.uuid}`}
            itemInfo={item}
            index={index}
          />
        ))
      )}
    </Box>
  )
}
