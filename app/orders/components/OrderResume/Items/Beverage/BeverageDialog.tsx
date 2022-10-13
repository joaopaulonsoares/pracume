import { useState } from "react"
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
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { mockedObservationsBeverage } from "../../../../mockedObservations"

export function BeverageDialog(props) {
  const { onClose, selectedValue, open, updateObservations, orderItemResume } = props

  const { selectedInfos } = orderItemResume
  const [selectedObservations, setSelectedObservations] = useState(
    selectedInfos.standardObservations
  )
  const [customObservations, setCustomObservations] = useState<string>(selectedInfos.observations)

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

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {selectedInfos.itemName}
          <IconButton aria-label="Editar item" size="small" onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="beverage"
              fullWidth
              label="Bebida"
              variant="outlined"
              multiline
              maxRows={4}
              disabled
              value={selectedInfos.itemName}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="beverage-observationss"
              options={mockedObservationsBeverage}
              disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              filterSelectedOptions
              fullWidth
              value={selectedObservations}
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
              <Button type="submit" variant="outlined" onClick={() => handleSubmit()}>
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
