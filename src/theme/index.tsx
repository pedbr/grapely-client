import palette from './palette'
import shadows from './shadows'
import PropTypes from 'prop-types'
import typography from './typography'
import breakpointsX from './breakpoints'
import React, { useMemo } from 'react'
// import { useSelector } from 'react-redux'
import GlobalStyles from './globalStyles'
import borderRadius from './borderRadius'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
}

interface Props {
  children: JSX.Element | React.ReactNode
}

function ThemeConfig({ children }: Props) {
  const isLight = true
  // const isLight = useSelector((state) => !state.theme.darkMode)

  const themeOptions = {
    palette: palette[isLight ? 'light' : 'dark'],
    customShadows: shadows[isLight ? 'light' : 'dark'],
    customTypography: typography,
    shape: borderRadius,
    breakpoints: breakpointsX,
    appBar: {
      height: 92,
    },
    borderRadius: {
      card: 20,
    },
  }

  if (!isLight) themeOptions.palette.mode = 'dark'

  const theme = useMemo(() => createMuiTheme(themeOptions), [themeOptions])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default ThemeConfig
