import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  Grid,
  Button,
  TextField,
  MenuItem,
} from "@mui/material"
import { SelectTextField, MaterialTextField } from "app/core/components/FormFields"
import { Form } from "react-final-form"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import { items } from "app/orders/mockedProducts"
import { info } from "console"
import { array } from "zod"

export function DefaultDialog(props) {
  const { onClose, selectedValue, open, infos } = props
  const [selectedItemId, setSelectedItemId] = useState(infos.item)
  const [itemChoosedId, setItemChoosedId] = useState(infos.item)
  console.log(infos)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  // https://www.npmjs.com/package/react-final-form-arrays
  // https://codesandbox.io/s/react-final-form-field-arrays-vq9pz?file=/index.js:198-208

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {infos.name}
          <IconButton aria-label="Editar item" size="small" onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box padding={1}>
        <TextField
          disabled
          fullWidth
          id="outlined-select-currency"
          select
          label="Selecione a variação do produto"
          value={selectedItemId}
          onChange={() => {}}
        >
          {items.map((item) => (
            <MenuItem key={`item-select-product-dialog-${item.id}`} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        {/*
        <Form
          initialValues={castedInfos}
          onSubmit={(values) => {
            console.log(values)
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>


                  <Field name="sandwich" component="select">
                    <option />
                    <option value="#ff0000">❤️ Red</option>
                    <option value="#00ff00">💚 Green</option>
                    <option value="#0000ff">💙 Blue</option>
                  </Field>

                  <SelectTextField
                    name="sandwich"
                    label="Sanduíche"
                    placeholder="teste"
                    options={mockedProducts.sandwiches}
                  />
                </Grid>

                {infos.items.map((item, index) => (
                  <Grid item xs={12} key={`${item.type}-${index}`}>
                    <MaterialTextField name={item.type} label={item.type} placeholder="teste" />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  {" "}
                  <MaterialTextField
                    name="observations"
                    label="Observações"
                    placeholder="teste"
                    multiline
                    rows={4}
                  />{" "}
                </Grid>
              </Grid>

              <Grid item xs={12} paddingTop={1}>
                <Box width="100%" display="flex" justifyContent="center">
                  <Button type="submit" variant="outlined">
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </form>
          )}
        />
*/}
      </Box>
    </Dialog>
  )
}
