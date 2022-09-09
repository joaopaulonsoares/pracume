import { ArrowForwardTwoTone } from "@mui/icons-material"
import { Box, Card, CardHeader, Divider, Typography, Button } from "@mui/material"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"
import { ComboOrderItem } from "app/orders/components/OrderResume/Items/Combo/ComboItem"
import { DefaultOrderItem } from "app/orders/components/OrderResume/Items/Default/DefaultItem"

import { Categories } from "app/core/enums/categories.enum"

export function OrderResume({ selectedProducts, handleSelectedRemove, handleItemEdit }: any) {
  function handleRemove(itemUuid: string) {
    handleSelectedRemove(itemUuid)
  }

  function OrderSelectedProduct({ itemInfo, index }: any) {
    const { uuid, ...productInfo } = itemInfo

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
