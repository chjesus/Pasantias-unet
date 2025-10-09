import { useMemo } from 'react'

import {
  type Theme,
  createTheme,
  type ThemeOptions,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Palette from '@/utils/theme/palette'

import type { ChildrenProps } from '@/types/props'

function CustomThemeProvider({ children }: ChildrenProps) {
  const theme: Theme = useMemo<Theme>(() => Palette(), [])

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      cssVariables: true,
      cssVarPrefix: 'krix',
      palette: theme.palette,
    }),
    [theme]
  )

  const muiTheme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default CustomThemeProvider
