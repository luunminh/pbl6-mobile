import { Paths, RootStackParamList } from '@appConfig/paths';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthService, getFullName } from '@shared';
import { Button, Circle, Stack, Text, VStack } from 'native-base';
import React from 'react';
import { LoadingContainer } from '../StartupContainers';
import EditProfile from './EditProfile';
import Profile from '.';
import ChangePassword from './ChangePassword';
import { ColorCode } from '@appConfig/theme';
import EmailVerify from './ChangePassword/EmailVerify';
type Props = NativeStackScreenProps<RootStackParamList, Paths.PROFILE>;

const ProfileStack = createNativeStackNavigator();

const ProfileRouting = ({ navigation, route }: Props) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTintColor: ColorCode.PRIMARY,
        headerShadowVisible: false,
      }}
    >
      <ProfileStack.Screen
        name={Paths.PROFILE}
        component={Profile}
        options={{ headerShown: true, headerTitle: '' }}
      />
      <ProfileStack.Screen name={Paths.EDIT_PROFILE} component={EditProfile} />
      <ProfileStack.Screen name={Paths.VERIFY_EMAIL} component={EmailVerify} />
      <ProfileStack.Screen name={Paths.CHANGE_PASS} component={ChangePassword} />
    </ProfileStack.Navigator>
  );
};

export default ProfileRouting;
