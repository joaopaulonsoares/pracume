import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { MaterialTextField, SelectField } from "app/core/components/FormFields"
import { z } from "zod"
import { Box, InputAdornment } from "@mui/material"
export { FORM_ERROR } from "app/core/components/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Box width="500px">
      <Form<S> {...props}>
        <MaterialTextField required name="name" label="Name" placeholder="Nome" />
        <MaterialTextField
          required
          name="description"
          label="Descrição"
          placeholder="Descrição"
          multiline
          rows={4}
        />
        <MaterialTextField
          required
          name="price"
          label="Preço"
          placeholder="20,00"
          type="number"
          startInputAdornmentText="R$"
        />
        <MaterialTextField
          required
          name="isActive"
          label="Produto Disponível"
          placeholder="true ou false"
        />
      </Form>
    </Box>
  )
}
