import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material"
import { SelectTextField, MaterialTextField } from "app/core/components/FormFields"
import { Form } from "react-final-form"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import { items } from "app/orders/mockedProducts"
import { info } from "console"
import { array } from "zod"
import { useForm, Controller } from "react-hook-form"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"

import { mockedObservationsBeverage } from "../../../../mockedObservations"
import { extraItemsProducts } from "../../../../mockedProducts"

export function BeverageDialog(props) {
  const { onClose, selectedValue, open, infos, updateObservations } = props
  const [selectedObservations, setSelectedObservations] = useState([])
  const [customObservations, setCustomObservations] = useState<string>(infos.customObservations)
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  const additionalOptions = extraItemsProducts.filter((item) => item.forCategory === "sandwich")
  console.log(additionalOptions)

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
          <IconButton aria-label="Editar item" size="small" onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="sandwich"
              fullWidth
              label="Bebida"
              variant="outlined"
              multiline
              maxRows={4}
              disabled
              value={infos.name}
            />
          </Grid>

          {/*
          <Grid item xs={12}>
          <Autocomplete
            multiple
            //defaultValue={infos.defaultObservations}
            id="additional-items"
            options={additionalOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            fullWidth
            // onChange={(event, value) => handleObservationsChange(value)}
            renderOption={(props, option, { selected }) => (
              <li key={`list-item-${option.id}`} {...props}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.name} - R${" "}
                {formatScaledPriceToPtBr(option.amount.value, option.amount.scale)}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Itens Adicionais" />}
          />
        </Grid>
            */}

          <Grid item xs={12}>
            <Autocomplete
              multiple
              defaultValue={infos.defaultObservations}
              id="beverage-observationss"
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
              renderInput={(params) => <TextField {...params} label="Observações padrões" />}
            />
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
