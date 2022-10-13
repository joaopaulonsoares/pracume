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
          ;(item.defaultObservations = defaultObservations),
            (item.customObservation = customObservation)

          if (item.category === Categories.COMBO) {
          } else {
            item.selectedInfos.observations = customObservation
            item.selectedInfos.standardObservations = defaultObservations
          }

          toast.success("Observações atualizadas com sucesso!")

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
