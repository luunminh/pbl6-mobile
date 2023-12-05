import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from '.';
import Product from '../Product';
// import Product from './Product';
type Props = NativeStackScreenProps<RootStackParamList, Paths.PRODUCT>;

const CategoryStack = createNativeStackNavigator();

const CategoryRouting = ({ navigation, route }: Props) => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTintColor: ColorCode.PRIMARY,
        headerShadowVisible: false,
      }}
    >
      <CategoryStack.Screen
        name={Paths.CATEGORY}
        component={Category}
        options={{ headerShown: true, headerTitle: 'Category' }}
      />
      <CategoryStack.Screen
        name={Paths.PRODUCT}
        component={Product}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </CategoryStack.Navigator>
  );
};

export default CategoryRouting;
