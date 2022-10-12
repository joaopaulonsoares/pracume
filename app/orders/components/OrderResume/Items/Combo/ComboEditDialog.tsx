import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  Grid,
  Button,
  TextField,
  Checkbox,
  Autocomplete,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"

import {
  mockedObservationsBeverage,
  mockedObservationsSandwich,
} from "../../../../mockedObservations"
import { items } from "../../../../mockedProducts"

import { extraItemsProducts } from "../../../../mockedProducts"

export function ComboEditDialog(props) {
  console.log(props.infos)
  //console.log(props.infos)
  const { onClose, selectedValue, open, infos, updateObservations } = props

  const [selectedBeveragem, setSelectedBeverage] = useState(infos.defaultOptions.drink)
  const [selectedAdditionalItem, setSelectedAdditionaltem] = useState(
    infos.defaultOptions.additional
  )

  const [selectedObservations, setSelectedObservations] = useState([])
  const [customObservations, setCustomObservations] = useState<string>(infos.customObservations)
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  const drinks = items.filter((item) => item.category === "beverage")
  const beverageComboOptions = props.infos.options.drink.map((itemId) => {
    const found = drinks.find((drink) => drink.id === itemId)
    if (found) {
      return found
    } else {
      return
    }
  })

  const additionals = items.filter((item) => item.category === "additional")
  const additionalsComboOptions = props.infos.options.additionals.map((itemId) => {
    const found = additionals.find((item) => item.id === itemId)
    if (found) {
      return found
    } else {
      return
    }
  })

  const handleClose = () => {
    onClose(selectedValue)
  }

  function handleObservationsChange(value: any) {
    setSelectedObservations(value)
  }

  function handleSubmit() {
    updateObservations(selectedObservations, customObservations)
    handleClose()
  }
  // https://www.npmjs.com/package/react-final-form-arrays
  // https://codesandbox.io/s/react-final-form-field-arrays-vq9pz?file=/index.js:198-208

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {infos.name}
          <IconButton aria-label="Fechar dialogo" size="small" onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider>Sanduiche</Divider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="sandwich"
              fullWidth
              label="Sanduíche"
              variant="outlined"
              multiline
              maxRows={4}
              disabled
              value={infos.name}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              defaultValue={infos.defaultObservations}
              id="sandwich-observationss"
              options={mockedObservationsSandwich}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              onChange={(event, value) => handleObservationsChange(value)}
              renderOption={(props, option, { selected }) => (
                <li key={`list-item-${option.id}`} {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.description}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Observações sanduíche" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider>Bebida</Divider>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Bebida</InputLabel>
              <Select
                labelId="beverage-select"
                id="beverage-select"
                value={selectedBeveragem}
                label="Bebida"
                onChange={(event) => setSelectedBeverage(event.target.value)}
              >
                {beverageComboOptions.map((drink) => {
                  return (
                    <MenuItem key={`drink-${drink.id}`} value={drink.id}>
                      {drink.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              defaultValue={infos.defaultObservations}
              id="beverage-observations"
              options={mockedObservationsBeverage}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              onChange={(event, value) => handleObservationsChange(value)}
              renderOption={(props, option, { selected }) => (
                <li key={`list-item-${option.id}`} {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.description}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Observações bebida" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider>Item Adicional</Divider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="additional"
              fullWidth
              label="Item adicional"
              variant="outlined"
              multiline
              maxRows={4}
              disabled
              value={infos.name}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              defaultValue={infos.defaultObservations}
              id="additional-observations"
              options={mockedObservationsBeverage}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              onChange={(event, value) => handleObservationsChange(value)}
              renderOption={(props, option, { selected }) => (
                <li key={`list-item-${option.id}`} {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.description}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Observações item adicional" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="custom-observation"
              fullWidth
              label="Outras observações"
              variant="outlined"
              multiline
              rows={2}
              value={customObservations}
              onChange={(e) => setCustomObservations(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Box width="100%" display="flex" alignItems="center" justifyContent="center">
              <Button
                type="submit"
                variant="outlined"
                onClick={() => handleSubmit()}
                disabled={isSubmiting}
              >
                {!isSubmiting ? "Salvar" : "Processando"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
