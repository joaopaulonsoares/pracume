import { ArrowForwardTwoTone } from "@mui/icons-material"
import { Box, Card, CardHeader, Divider, Typography, Button } from "@mui/material"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"
import { SandwichOrderItem } from "app/orders/components/OrderResume/Items/Sandwich/SandwichItem"
import { ComboOrderItem } from "app/orders/components/OrderResume/Items/Combo/ComboItem"

export function OrderResume({ selectedProducts, handleSelectedRemove, handleItemEdit }: any) {
  function handleRemove() {
    handleSelectedRemove()
  }

  function OrderSelectedProduct({ itemInfo, index }: any) {
    const { itemUuid, ...productInfo } = itemInfo

    switch (itemInfo.type) {
      case "sandwich":
        return (
          <SandwichOrderItem
            productInfo={itemInfo}
            itemUuid={itemUuid}
            index={index}
            handleRemove={handleRemove}
          />
        )
      case "combo":
        return (
          <ComboOrderItem
            productInfo={itemInfo}
            itemUuid={itemUuid}
            index={index}
            handleRemove={handleRemove}
          />
        )
    }
  }

  return (
    <Box paddingTop="60px">
      <Card sx={{ minHeight: { xs: 0, md: 0 } }}>
        <CardHeader title="Resumo do Pedido" />
        <Divider />
        <Box display="flex" flexDirection="column" justifyContent="space-between">
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
              selectedProducts.map((item, index) => <div key={`index-${index}`}>oi</div>)
            )}
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
            <Typography variant="h4">
              R$ {calculateTotalSelectedItemsPrice(selectedProducts)}
            </Typography>
            <Button
              variant="contained"
              color="success"
              endIcon={<ArrowForwardTwoTone />}
              disabled={selectedProducts.length === 0}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
