import { Text, View, Container } from 'native-base';
import { AuthContainer, SplashScreen } from './StartupContainers';
import { SignIn } from './UAM';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Paths } from '@appConfig/paths';
import SignUp from './UAM/SignUp';
import { ColorCode } from '@appConfig/theme';
import ForgotPassword from './UAM/ForgotPassword';
import ResetPassword from './UAM/ResetPassword';
import { IRootState } from '@redux/store';
import { connect } from 'react-redux';
import Home from './Home';

type ContainerProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const AppContainer: React.FC<ContainerProps> = ({ isAuthenticated }) => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        {!!isAuthenticated ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={Paths.HOME}
              component={Home}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
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

export default connect(mapStateToProps, undefined)(AppContainer);
