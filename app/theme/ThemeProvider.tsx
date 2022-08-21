import React, { useState, useEffect } from "react"
import { ThemeProvider } from "@mui/material"
import { themeCreator } from "./base"
import { StylesProvider } from "@mui/styles"

export const ThemeContext = React.createContext((themeName: string): void => {})

const ThemeProviderWrapper: React.FC = (props: any) => {
  const [curThemeName, setCurThemeName] = useState("PureLightTheme")
  const [themeName, _setThemeName] = useState(curThemeName)
  const theme = themeCreator(themeName)
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName)
    _setThemeName(themeName)
  }

  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("appTheme") || "PureLightTheme"
    setCurThemeName(item)
  }, [])

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  )
}

export default ThemeProviderWrapper
