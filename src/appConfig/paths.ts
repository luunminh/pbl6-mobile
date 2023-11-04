export enum Paths {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  FORGOT_PASS = 'forgotPassword',
  RESET_PASS = 'resetPassword',
  NAVBAR = 'NAVBAR',

  HOME = 'home',
  PRODUCT = 'product',
  CART = 'cart',

  PROFILE_ROUTING = 'profileRouting',
  PROFILE = 'profile',
  EDIT_PROFILE = 'editProfile',
  VERIFY_EMAIL = 'verifyEmail',
  CHANGE_PASS = 'changePass',
}

export type RootStackParamList = {
  Home: undefined;
  [Paths.SIGN_IN]: undefined;
  [Paths.SIGN_UP]: undefined;
  [Paths.FORGOT_PASS]: undefined;
  [Paths.RESET_PASS]: undefined;
  [Paths.HOME]: undefined;
  [Paths.PRODUCT]: undefined;
  [Paths.CART]: undefined;
  [Paths.PROFILE]: undefined;
  [Paths.NAVBAR]: undefined;
  [Paths.EDIT_PROFILE]: undefined;
  [Paths.VERIFY_EMAIL]: undefined;
  [Paths.CHANGE_PASS]: undefined;
};
