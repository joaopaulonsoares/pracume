import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { MaterialTextField, SelectField } from "app/core/components/FormFields"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <MaterialTextField name="name" label="Name" placeholder="Nome" />
      <MaterialTextField
        name="description"
        label="Descrição"
        placeholder="Descrição"
        multiline
        rows={4}
      />
      <MaterialTextField name="price" label="Preço" placeholder="Preço" type="number" />
    </Form>
  )
}
