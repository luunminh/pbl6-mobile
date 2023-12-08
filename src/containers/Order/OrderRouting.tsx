import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '.';
import ChooseStore from 'src/containers/ChooseStore';
import Checkout from '../Checkout';
import Order from '.';

type Props = NativeStackScreenProps<RootStackParamList, Paths.ORDER>;

const OrderStack = createNativeStackNavigator();

const OrderRouting = ({ navigation, route }: Props) => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerTintColor: ColorCode.PRIMARY,
        headerShadowVisible: false,
      }}
    >
      <OrderStack.Screen
        name={Paths.ORDER}
        component={Order}
        options={{ headerShown: true, title: 'My Order' }}
      />
    </OrderStack.Navigator>
  );
};

export default OrderRouting;
