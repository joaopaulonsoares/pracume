import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { TextField, MenuItem } from "@mui/material"

export interface TextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  placeholder: string
  required?: boolean
  rows?: number
  selectOptions: Array<any>
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const SelectField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      placeholder,
      outerProps,
      fieldProps,
      labelProps,
      required = false,
      selectOptions,
      ...props
    },
    ref
  ) => {
    return (
      <div {...outerProps}>
        <TextField
          select
          fullWidth
          label={label}
          placeholder={placeholder}
          required={required}
          name={name}
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    )
  }
)
