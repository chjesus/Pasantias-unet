import {
  PRIMARYCOLOR,
  SECONDARYCOLOR,
  ERRORCOLOR,
  WARNINGCOLOR,
  INFOCOLOR,
  SUCCESSCOLOR,
  CONTRASTTEXT,
} from './colors'

function Default() {
  return {
    primary: {
      light: PRIMARYCOLOR[0],
      main: PRIMARYCOLOR[1],
      dark: PRIMARYCOLOR[2],
      contrastText: CONTRASTTEXT,
    },
    secondary: {
      light: SECONDARYCOLOR[0],
      main: SECONDARYCOLOR[1],
      dark: SECONDARYCOLOR[2],
      contrastText: CONTRASTTEXT,
    },
    error: {
      light: ERRORCOLOR[0],
      main: ERRORCOLOR[1],
      dark: ERRORCOLOR[2],
      contrastText: CONTRASTTEXT,
    },
    warning: {
      light: WARNINGCOLOR[0],
      main: WARNINGCOLOR[1],
      dark: WARNINGCOLOR[2],
      contrastText: CONTRASTTEXT,
    },
    info: {
      light: INFOCOLOR[0],
      main: INFOCOLOR[1],
      dark: INFOCOLOR[2],
      contrastText: CONTRASTTEXT,
    },
    success: {
      light: SUCCESSCOLOR[0],
      main: SUCCESSCOLOR[1],
      dark: SUCCESSCOLOR[2],
      contrastText: CONTRASTTEXT,
    },
  }
}

export default Default
