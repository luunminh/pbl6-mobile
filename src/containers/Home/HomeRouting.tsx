import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '.';
import Category from '../Category';
import Product from '../Product';
import ProductDetail from '../ProductDetail';
import Search from '../Search';
import ChooseStore from '../ChooseStore';

type Props = NativeStackScreenProps<RootStackParamList, Paths.HOME>;

const HomeStack = createNativeStackNavigator();

const HomeRouting = ({ navigation, route }: Props) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: 'Home',
        headerTintColor: ColorCode.PRIMARY,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name={Paths.HOME} component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen
        name={Paths.CATEGORY}
        component={Category}
        options={{ headerShown: true, headerTitle: 'Category' }}
      />
      <HomeStack.Screen
        name={Paths.PRODUCT}
        component={Product}
        options={{ headerShown: true, headerTitle: 'Product List' }}
      />
      <HomeStack.Screen
        name={Paths.PRODUCT_DETAIL}
        component={ProductDetail}
        options={{ headerShown: true, headerTitle: 'Product Detail' }}
      />
      <HomeStack.Screen
        name={Paths.SEARCH}
        component={Search}
        options={{ headerShown: true, headerTitle: 'Search Product' }}
      />
      <HomeStack.Screen
        name={Paths.CHOOSE_STORE}
        component={ChooseStore}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeRouting;
