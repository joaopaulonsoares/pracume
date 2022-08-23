import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { TextField, InputAdornment } from "@mui/material"

export interface TextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  placeholder: string
  required?: boolean
  rows?: number
  multiline?: boolean
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  inputAdornmentText?: string
  startInputAdornmentText?: string
}

export const MaterialTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      placeholder,
      outerProps,
      fieldProps,
      labelProps,
      required = false,
      rows = 0,
      multiline = false,
      type,
      inputAdornmentText,
      startInputAdornmentText,
      ...props
    },
    ref
  ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === null ? "" : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <TextField
          disabled={submitting}
          fullWidth
          label={label}
          placeholder={placeholder}
          required={required}
          {...input}
          error={touched && normalizedError}
          multiline={multiline}
          rows={rows}
          type={type}
          InputProps={{
            endAdornment: <InputAdornment position="end">{inputAdornmentText}</InputAdornment>,
            startAdornment: (
              <InputAdornment position="start">{startInputAdornmentText}</InputAdornment>
            ),
          }}
        />

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default MaterialTextField
