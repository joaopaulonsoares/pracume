import { Box } from "@mui/material"

export function BoxCenter({ children, ...props }: any) {
  return (
    <Box display="flex" width="100%" height="100%" justifyContent="center" {...props}>
      {children}
    </Box>
  )
}
