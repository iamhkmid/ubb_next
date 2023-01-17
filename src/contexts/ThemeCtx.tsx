import React, { createContext, FC } from "react"
import { ThemeProvider } from "styled-components"
import { colors } from "../data/colors"

const theme: TTheme = {
  colors,
}

export const ThemeCtx = createContext<TThemeCtxProps>({ theme })

const ThemeCtxProvider: FC<TThemeCtxProviderProps> = ({ children }) => {
  return (
    <ThemeCtx.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  )
}

export default ThemeCtxProvider
