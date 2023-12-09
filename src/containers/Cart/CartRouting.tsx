import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '.';
import ChooseStore from 'src/containers/ChooseStore';
import Checkout from '../Checkout';
import EditDeliveryInfo from '../EditDeliveryInfo';
import ChooseVoucher from '../ChooseVoucher';
import OrderSuccess from '../OrderSuccess';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CART>;

const CartStack = createNativeStackNavigator();

const CartRouting = ({ navigation, route }: Props) => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerTintColor: ColorCode.PRIMARY,
        headerShadowVisible: false,
      }}
    >
      <CartStack.Screen name={Paths.CART} component={Cart} options={{ headerShown: false }} />
      <CartStack.Screen
        name={Paths.CHOOSE_STORE}
        component={ChooseStore}
        options={{ headerShown: false }}
      />
      <CartStack.Screen
        name={Paths.CHECKOUT}
        component={Checkout}
        options={{ headerShown: true, title: 'Checkout' }}
      />
      <CartStack.Screen
        name={Paths.EDIT_DELIVERY}
        component={EditDeliveryInfo}
        options={{ headerShown: true, title: 'Edit delivery information' }}
      />
      <CartStack.Screen
        name={Paths.CHOOSE_VOUCHER}
        component={ChooseVoucher}
        options={{ headerShown: false }}
      />
      <CartStack.Screen
        name={Paths.ORDER_SUCCESS}
        component={OrderSuccess}
        options={{ headerShown: false }}
      />
    </CartStack.Navigator>
  );
};

export default CartRouting;
