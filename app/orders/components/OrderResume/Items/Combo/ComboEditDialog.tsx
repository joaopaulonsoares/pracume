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

export function ComboEditDialog(props) {
  const { onClose, selectedValue, open, infos, updateCombo, orderItemResume } = props

  const { productInformations, selectedInfos } = orderItemResume

  const [selectedSandwichObservations, setSelectedSandwichObservations] = useState([])
  const [selectedBeverage, setSelectedBeverage] = useState(selectedInfos.beverage.itemId)
  const [selectedBeverageObservations, setSelectedBeverageObservations] = useState([])
  const [selectedAdditionalItem, setSelectedAdditionaltem] = useState(selectedInfos.extra.itemId)
  const [selectedAdditionalItemObservations, setSelectedAdditionalItemObservations] = useState([])

  const [customObservations, setCustomObservations] = useState<string>(infos.customObservations)
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  const comboSandwich = items.filter((item) => item.id === selectedInfos.sandwich.itemId)[0]

  const drinks = items.filter((item) => item.category === "beverage")
  const beverageComboOptions = productInformations.options.beverage.map((itemId) => {
    const found = drinks.find((drink) => drink.id === itemId)
    if (found) {
      return found
    } else {
      return
    }
  })

  const additionals = items.filter((item) => item.category === "additional")
  const additionalsComboOptions = productInformations.options.extra.map((itemId) => {
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

  function handleSubmit() {
    //updateObservations(selectedObservations, customObservations)
    updateCombo({
      sandwich: {
        standardObservations: selectedSandwichObservations,
      },
      beverage: {
        itemId: selectedBeverage,
        standardObservations: selectedBeverageObservations,
      },
      extra: {
        itemId: selectedAdditionalItem,
        standardObservations: selectedAdditionalItemObservations,
      },
      observations: customObservations,
    })
    handleClose()
  }
  // https://www.npmjs.com/package/react-final-form-arrays
  // https://codesandbox.io/s/react-final-form-field-arrays-vq9pz?file=/index.js:198-208

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {productInformations.name}
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
              value={comboSandwich?.name || "Erro"}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="sandwich-observationss"
              options={mockedObservationsSandwich}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              value={selectedSandwichObservations}
              onChange={(event, value) => setSelectedSandwichObservations(value as any)}
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
                value={selectedBeverage}
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
                <MenuItem key={`no-drink`} value={0}>
                  Sem bebida
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="beverage-observations"
              options={mockedObservationsBeverage}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              disabled={selectedBeverage === 0}
              value={selectedBeverageObservations}
              onChange={(event, value) => setSelectedBeverageObservations(value as any)}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Item extra</InputLabel>
              <Select
                labelId="additional-select"
                id="additional-select"
                value={selectedAdditionalItem}
                label="Item extra"
                onChange={(event) => setSelectedAdditionaltem(event.target.value)}
              >
                {additionalsComboOptions.map((additional) => {
                  return (
                    <MenuItem key={`additional-${additional.id}`} value={additional.id}>
                      {additional.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="additional-observations"
              options={mockedObservationsBeverage}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              value={selectedAdditionalItemObservations}
              onChange={(event, value) => setSelectedAdditionalItemObservations(value as any)}
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
