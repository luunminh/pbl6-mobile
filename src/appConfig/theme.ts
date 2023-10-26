import { extendTheme } from 'native-base';

export enum ColorCode {
  PRIMARY = '#0984E8',
  SECONDARY = '#E3BC56',
  WHITE = '#fff',
  BLACK = '#000',
  SUCCESS = '#1EA431',
  WARNING = '#D67813',
  DANGER = '#DB221A',
  INFO = '#0492DE',
  SUCCESS_BG = '#DAFAD0',
  WARNING_BG = '#FEF2CB',
  DANGER_BG = '#FDE0D0',
  INFO_BG = '#D6ECFF',

  PRIMARY_700 = '#0F3F7F',
  PRIMARY_600 = '#0061B0',
  PRIMARY_500 = '#0984E8',
  PRIMARY_400 = '#74B8F0',
  PRIMARY_300 = '#D6ECFF',
  PRIMARY_200 = '#E9F5FF',
  PRIMARY_100 = '#E9E9E9',

  GREY_50 = '#F8F8F9',
  GREY_100 = '#EDEFF1',
  GREY_200 = '#DEE1E5',
  GREY_300 = '#CFD4D9',
  GREY_400 = '#B5BDC5',
  GREY_500 = '#91979E',
  GREY_600 = '#6D7176',
  GREY_700 = '#484C4F',
  GREY_800 = '#2D2F31',
  GREY_900 = '#1B1C1E',

  RED_200 = '#FEECEE',
  RED_400 = '#ED7773',
  RED_500 = '#DB221A',
}

export const theme = extendTheme({
  colors: {
    primary: {
      50: ColorCode.PRIMARY,
      100: ColorCode.PRIMARY_100,
      200: ColorCode.PRIMARY_200,
      300: ColorCode.PRIMARY_300,
      400: ColorCode.PRIMARY_400,
      500: ColorCode.PRIMARY_500,
      600: ColorCode.PRIMARY_600,
      700: ColorCode.PRIMARY_700,
    },
    gray: {
      50: ColorCode.GREY_50,
      100: ColorCode.GREY_100,
      200: ColorCode.GREY_200,
      300: ColorCode.GREY_300,
      400: ColorCode.GREY_400,
      500: ColorCode.GREY_500,
      600: ColorCode.GREY_600,
      700: ColorCode.GREY_700,
      800: ColorCode.GREY_800,
      900: ColorCode.GREY_900,
    },
  },
});
