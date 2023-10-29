export enum Paths {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  FORGOT_PASS = 'forgotPassword',
  RESET_PASS = 'resetPassword',

  HOME = 'home',
}

export type RootStackParamList = {
  Home: undefined;
  [Paths.SIGN_IN]: undefined;
  [Paths.SIGN_UP]: undefined;
  [Paths.FORGOT_PASS]: undefined;
  [Paths.RESET_PASS]: undefined;
  [Paths.HOME]: undefined;
};
