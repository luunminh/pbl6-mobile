import { Paths } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IRootState } from '@redux/store';
import { Text, View } from 'native-base';
import { connect } from 'react-redux';
import CartRouting from './Cart/CartRouting';
import Home from './Home';
import HomeRouting from './Home/HomeRouting';
import Order from './Order';
import ProfileRouting from './Profile/ProfileRouting';
import { AuthContainer } from './StartupContainers';
import { SignIn } from './UAM';
import ForgotPassword from './UAM/ForgotPassword';
import ResetPassword from './UAM/ResetPassword';
import SignUp from './UAM/SignUp';
import OrderRouting from './Order/OrderRouting';

const Tab = createBottomTabNavigator();

const tabBarScreenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: 80,
    backgroundColor: ColorCode.WHITE,
  },
};

const getNavigationButton = (icon: React.ReactNode, title: string, focused: boolean) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    {icon}
    <Text color={getColor(focused)}>{title}</Text>
  </View>
);

const getColor = (isFocus: boolean) => (isFocus ? ColorCode.PRIMARY : ColorCode.GREY_300);

const AppContainer: React.FC<ContainerProps> = ({ isAuthenticated }) => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        {!!isAuthenticated ? (
          <Tab.Navigator screenOptions={tabBarScreenOptions}>
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  getNavigationButton(
                    <AntDesign name="home" size={24} color={getColor(focused)} />,
                    'Home',
                    focused,
                  ),
              }}
              name={Paths.HOME_ROUTING}
              component={HomeRouting}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  getNavigationButton(
                    <Feather name="shopping-bag" size={24} color={getColor(focused)} />,
                    'Order',
                    focused,
                  ),
              }}
              name={Paths.ORDER_ROUTING}
              component={OrderRouting}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  getNavigationButton(
                    <Feather name="shopping-cart" size={24} color={getColor(focused)} />,
                    'Cart',
                    focused,
                  ),
              }}
              name={Paths.CART_ROUTING}
              component={CartRouting}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  getNavigationButton(
                    <Feather name="user" size={24} color={getColor(focused)} />,
                    'Profile',
                    focused,
                  ),
              }}
              name={Paths.PROFILE_ROUTING}
              component={ProfileRouting}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName={Paths.SIGN_IN}
            screenOptions={{
              headerStyle: { backgroundColor: ColorCode.WHITE },
              title: '',
              headerTintColor: ColorCode.PRIMARY,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={Paths.HOME}
              component={Home}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={Paths.SIGN_IN}
              component={SignIn}
            />
            <Stack.Screen
              options={{
                headerTitle: '',
              }}
              name={Paths.SIGN_UP}
              component={SignUp}
            />
            <Stack.Screen
              options={{
                headerTitle: '',
              }}
              name={Paths.FORGOT_PASS}
              component={ForgotPassword}
            />
            <Stack.Screen
              options={{
                headerTitle: '',
              }}
              name={Paths.RESET_PASS}
              component={ResetPassword}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <AuthContainer />
    </>
  );
};

type ContainerProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(AppContainer);
