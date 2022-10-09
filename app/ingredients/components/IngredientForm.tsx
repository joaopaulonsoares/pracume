import { Box } from "@mui/material"
import { Form, FormProps } from "app/core/components/Form"
import { MaterialTextField } from "app/core/components/FormFields"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

const selectOptions = [
  { id: 1, name: "gramas" },
  { id: 2, name: "mililitros" },
]

export function IngredientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Box width="500px">
      <Form<S> {...props}>
        {JSON.stringify(props.initialValues)}
        <MaterialTextField name="name" label="Name" placeholder="Name" />
        <MaterialTextField
          name="unitMeasurement"
          label="Unidade de Medida"
          placeholder="Unidade de Medida"
        />
        <MaterialTextField
          name="quantity"
          label="Quantidade U.M"
          placeholder="Quantidade da unidade"
          type="number"
        />
      </Form>
    </Box>
  )
}
