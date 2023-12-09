import { ContactType } from '@queries';

export enum Paths {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  FORGOT_PASS = 'forgotPassword',
  RESET_PASS = 'resetPassword',
  NAVBAR = 'NAVBAR',

  HOME = 'home',
  HOME_ROUTING = 'homeRouting',

  SEARCH = 'search',
  CHOOSE_STORE = 'chooseStore',

  PRODUCT = 'product',
  PRODUCT_DETAIL = 'productDetail',

  CATEGORY_ROUTING = 'categoryRouting',
  CATEGORY = 'category',

  CART = 'cart',
  CART_ROUTING = 'cartRouting',
  CHECKOUT = 'checkout',
  EDIT_DELIVERY = 'editDelivery',

  ORDER = 'order',
  ORDER_DETAIL = 'orderDetail',
  ORDER_ROUTING = 'orderRouting',
  ORDER_SUCCESS = 'orderSuccess',

  CHOOSE_VOUCHER = 'chooseVoucher',

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
  [Paths.SEARCH]: undefined;
  [Paths.CHOOSE_STORE]: undefined;
  [Paths.ORDER]: undefined;
  [Paths.ORDER_SUCCESS]: undefined;
  [Paths.ORDER_DETAIL]: { orderId: string };
  [Paths.PRODUCT]: { categoryId?: string; categoryName?: string; searchText?: string };
  [Paths.PRODUCT_DETAIL]: { productId: string };
  [Paths.CATEGORY]: undefined;
  [Paths.CART]: undefined;
  [Paths.CHECKOUT]: undefined;
  [Paths.CHOOSE_VOUCHER]: { subTotal: number };
  [Paths.EDIT_DELIVERY]: { contact: ContactType };
  [Paths.PROFILE]: undefined;
  [Paths.NAVBAR]: undefined;
  [Paths.EDIT_PROFILE]: undefined;
  [Paths.VERIFY_EMAIL]: undefined;
  [Paths.CHANGE_PASS]: undefined;
};
