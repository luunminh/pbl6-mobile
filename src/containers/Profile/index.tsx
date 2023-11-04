import { Paths, RootStackParamList } from '@appConfig/paths';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService, getFullName } from '@shared';
import { Avatar, Button, Circle, Stack, Text, VStack } from 'native-base';
import { LoadingContainer } from '../StartupContainers';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '@redux/auth/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, Paths.PROFILE>;

const Profile = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();

  const { profile, isLoading } = useGetProfile();

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <VStack w={'100%'} h={'100%'} bgColor={'white'} px={4} pt={10} justifyContent={'space-between'}>
      <Stack flexDirection={'row'}>
        <Avatar size={120} bg={'gray.300'} source={{ uri: profile.avatarUrl }} />
        <VStack ml={6}>
          <Text fontSize={40}>{getFullName({ ...profile })}</Text>
          <Button bgColor={'primary.50'} onPress={() => navigation.navigate(Paths.EDIT_PROFILE)}>
            Edit
          </Button>
        </VStack>
      </Stack>
      <VStack space={4}>
        <Button variant={'outline'} onPress={() => navigation.navigate(Paths.VERIFY_EMAIL)}>
          Change Password
        </Button>
        <Button
          bgColor={'primary.50'}
          onPress={async () => {
            dispatch(setAuthenticated(false));
            await AuthService.clearToken();
          }}
        >
          Log out
        </Button>
      </VStack>
    </VStack>
  );
};

export default Profile;
