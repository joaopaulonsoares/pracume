import { Dialog, DialogTitle, Box, IconButton, Grid, Button } from "@mui/material"
import { SelectTextField, MaterialTextField } from "app/core/components/FormFields"
import { mockedProducts } from "app/orders/mockedProducts"
import { Form } from "react-final-form"
import CloseIcon from "@mui/icons-material/Close"

export function DefaultDialog(props) {
  const { onClose, selectedValue, open, infos } = props
  console.log(infos)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  // https://www.npmjs.com/package/react-final-form-arrays
  // https://codesandbox.io/s/react-final-form-field-arrays-vq9pz?file=/index.js:198-208

  console.log(infos.items)

  const castedInfos = {
    sandwich: infos.items[0].productId,
    beverage: infos.items[2].productId,
    additional: infos.items[1].productId,
  }
  console.log(castedInfos)

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
        <Form
          initialValues={castedInfos}
          onSubmit={(values) => {
            console.log(values)
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/*

                  <Field name="sandwich" component="select">
                    <option />
                    <option value="#ff0000">❤️ Red</option>
                    <option value="#00ff00">💚 Green</option>
                    <option value="#0000ff">💙 Blue</option>
                  </Field>
                  */}
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
      </Box>
    </Dialog>
  )
}
