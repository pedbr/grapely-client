/* eslint-disable no-unused-vars */
import * as createPalette from '@material-ui/core/styles/createPalette'
import * as createTypography from '@material-ui/core/styles/createTypography'

declare module '@material-ui/core/styles/createPalette' {
  interface PalettePrimaryOptions {
    lighter: string
    light: string
    main: string
    dark: string
    contrastText: string
  }

  interface PaletteSecondaryOptions {
    light: string
    main: string
    dark: string
    contrastText: string
  }

  interface PaletteInfoOptions {
    lighter: string
    light: string
    main: string
    dark: string
    darker: string
    contrastText: string
  }

  interface PaletteSuccessOption {
    lighter: string
    light: string
    main: string
    dark: string
    darker: string
    contrastText: string
  }

  interface PaletteWarningOption {
    lighter: string
    light: string
    main: string
    dark: string
    darker: string
    contrastText: string
  }

  interface PaletteErrorOption {
    lighter: string
    light: string
    main: string
    dark: string
    darker: string
    contrastText: string
  }

  interface PaletteGreyOptions {
    0: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    500_8: string
    500_12: string
    500_16: string
    500_24: string
    500_32: string
    500_48: string
    500_56: string
    500_80: string
  }

  interface PaletteGradientsOptions {
    primary: string
    info: string
    success: string
    warning: string
    error: string
  }

  interface PaletteTextOptions {
    primary: string
    secondary: string
    disabled: string
  }

  interface PaletteBackgroundOptions {
    paper: string
    default: string
    neutral: string
  }

  interface PaletteActionOptions {
    active: string
    hover: string
    selected: string
    disabled: string
    disabledBackground: string
    focus: string
    hoverOpacity: number
    disabledOpacity: number
  }

  interface PaletteOptions {
    primary?: PalettePrimaryOptions
    secondary?: PaletteSecondaryOptions
    info?: PaletteInfoOptions
    success?: PaletteSuccessOption
    warning?: PaletteWarningOption
    error?: PaletteErrorOption
    grey?: PaletteGreyOptions
    gradients?: PaletteGradientsOptions
    text?: PaletteTextOptions
    background?: PaletteBackgroundOptions
    action?: PaletteActionOptions
  }

  interface Palette {
    branding: PaletteBrandingOptions
    primary: PalettePrimaryOptions
    secondary: PaletteSecondaryOptions
    info: PaletteInfoOptions
    success: PaletteSuccessOption
    warning: PaletteWarningOption
    error: PaletteErrorOption
    grey: PaletteGreyOptions
    gradients: PaletteGradientsOptions

    text: PaletteTextOptions

    divider: string

    background: PaletteBackgroundOptions

    action: PaletteActionOptions
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface FontsOptions {
    main?: string
  }

  interface TypographyOptions {
    fonts?: FontsOptions
  }

  interface Typography {
    fonts: FontsOptions
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customShadows: any
    customTypography: any
    borderRadius: {
      card: number
    }
    appbar: {
      height: number
    }
    paneSize: {
      big: number
      small: number
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    customShadows?: any
    customTypography?: any
    borderRadius?: {
      card: number
    }
    appbar?: {
      height: number
    }
    paneSize?: {
      big: number
      small: number
    }
  }
}
