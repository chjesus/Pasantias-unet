import { createTheme } from '@mui/material/styles'
import ThemeDefault from './themeDefault'

export default function Palette() {
  const paletteColor = ThemeDefault()

  return createTheme({
    palette: {
      ...paletteColor,
      action: { disabled: paletteColor.secondary.light },
    },
  })
}
