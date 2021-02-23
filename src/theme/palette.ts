export const rgbToHex = (rgb: any) => {
  const [r, g, b] = rgb.match(/^rgba?\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*).*?\)$/)
  return { r, g, b }
}

export const addTransparency = (color: any, transparency = 1) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    let c = color.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = `0x${c.join('')}`
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ','
    )},${transparency})`
  } else if (/^rgba?\(\s*\d*\s*,\s*\d*\s*,\s*\d*.*?\)$/.test(color)) {
    const { r, g, b } = rgbToHex(color)
    return `rgba(${r},${g},${b},${transparency})`
  }
}

export const hexToRgbA = (hex: any, transparency = 1) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = `0x${c.join('')}`
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ','
    )},${transparency})`
  }
  throw new Error('Bad Hex')
}

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

// Setup Colors
const PRIMARY = {
  lighter: '#FFEEEA',
  light: '#FFC8BC',
  main: '#FF9A84',
  dark: '#FF8165',
}
const SECONDARY = {
  light: '#03965D',
  main: '#055F45',
  dark: '#074037',
}
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
}
const SUCCESS = {
  lighter: '#C8FACD',
  light: '#C8FACD',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
}
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: addTransparency('#919EAB', 0.08),
  500_12: addTransparency('#919EAB', 0.12),
  500_16: addTransparency('#919EAB', 0.16),
  500_24: addTransparency('#919EAB', 0.24),
  500_32: addTransparency('#919EAB', 0.32),
  500_48: addTransparency('#919EAB', 0.48),
  500_56: addTransparency('#919EAB', 0.56),
  500_80: addTransparency('#919EAB', 0.8),
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
}

const Palette = {
  // LIGHT
  light: {
    mode: 'light',
    primary: {
      lighter: PRIMARY.lighter,
      light: PRIMARY.light,
      main: PRIMARY.main,
      dark: PRIMARY.dark,
      contrastText: '#fff',
    },
    secondary: {
      light: SECONDARY.light,
      main: SECONDARY.main,
      dark: SECONDARY.dark,
      contrastText: '#fff',
    },
    info: {
      lighter: INFO.lighter,
      light: INFO.light,
      main: INFO.main,
      dark: INFO.dark,
      darker: INFO.darker,
      contrastText: '#fff',
    },
    success: {
      lighter: SUCCESS.lighter,
      light: SUCCESS.light,
      main: SUCCESS.main,
      dark: SUCCESS.dark,
      darker: SUCCESS.darker,
      contrastText: GREY[800],
    },
    warning: {
      lighter: WARNING.lighter,
      light: WARNING.light,
      main: WARNING.main,
      dark: WARNING.dark,
      darker: WARNING.darker,
      contrastText: GREY[800],
    },
    error: {
      lighter: ERROR.lighter,
      light: ERROR.light,
      main: ERROR.main,
      dark: ERROR.dark,
      darker: ERROR.darker,
      contrastText: '#fff',
    },

    grey: GREY,
    gradients: GRADIENTS,

    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },

    divider: GREY[500_24],

    background: {
      paper: '#fff',
      default: '#fff',
      neutral: GREY[200],
    },

    action: {
      active: GREY[600],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  },

  // DARK
  dark: {
    mode: 'dark',
    primary: {
      lighter: PRIMARY.lighter,
      light: PRIMARY.light,
      main: PRIMARY.main,
      dark: PRIMARY.dark,
      contrastText: '#fff',
    },
    secondary: {
      light: SECONDARY.light,
      main: SECONDARY.main,
      dark: SECONDARY.dark,
      contrastText: '#fff',
    },
    info: {
      lighter: INFO.lighter,
      light: INFO.light,
      main: INFO.main,
      dark: INFO.dark,
      darker: INFO.darker,
      contrastText: '#fff',
    },
    success: {
      lighter: SUCCESS.lighter,
      light: SUCCESS.light,
      main: SUCCESS.main,
      dark: SUCCESS.dark,
      darker: SUCCESS.darker,
      contrastText: GREY[800],
    },
    warning: {
      lighter: WARNING.lighter,
      light: WARNING.light,
      main: WARNING.main,
      dark: WARNING.dark,
      darker: WARNING.darker,
      contrastText: GREY[800],
    },
    error: {
      lighter: ERROR.lighter,
      light: ERROR.light,
      main: ERROR.main,
      dark: ERROR.dark,
      darker: ERROR.darker,
      contrastText: '#fff',
    },

    grey: GREY,
    gradients: GRADIENTS,

    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600],
    },

    divider: GREY[500_24],

    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
    },

    action: {
      active: GREY[500],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  },
}

export default Palette
