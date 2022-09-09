import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"

export function ComboCard({ info, handleSelection }: any) {
  const { name, amount } = info

  function handleSelectItem() {
    handleSelection(info)
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={2}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
              fontSize="14px"
            >
              R$ {formatScaledPriceToPtBr(amount.value, amount.scale)}
            </Typography>
            <Button size="small" color="success" onClick={() => handleSelectItem()}>
              Adicionar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}
