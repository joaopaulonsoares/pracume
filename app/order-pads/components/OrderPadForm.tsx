import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function OrderPadForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="holderName" label="Nome do cliente" placeholder="Nome do cliente" />
      <LabeledTextField name="tableReference" label="Mesa" placeholder="Mesa" />
    </Form>
  )
}
