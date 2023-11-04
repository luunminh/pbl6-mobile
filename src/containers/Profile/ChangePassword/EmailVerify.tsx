import { Paths, RootStackParamList } from '@appConfig/paths';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { useRequestChangePassword } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService, isEmpty } from '@shared';
import { Button, Center, FormControl, Icon, Input, Stack, Text } from 'native-base';
import React, { useState } from 'react';
import { useToastify } from '@shared/hooks';
import { LoadingContainer } from 'src/containers/StartupContainers';
import { MaterialIcons } from '@expo/vector-icons';
import ChangePassword from '.';

type Props = NativeStackScreenProps<RootStackParamList, Paths.VERIFY_EMAIL>;

const EmailVerify = ({ navigation, route }: Props) => {
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const { showError, showSuccess } = useToastify();
  const { profile } = useGetProfile({
    onErrorCallback: (error) => showError(error?.message),
  });

  const { email } = profile || {};

  const { requestChangePassword, isSuccess, isLoading } = useRequestChangePassword({
    onError: (error) => {
      showError(error.message);
    },
    onSuccess: () => showSuccess('Please check your email to get a token!'),
  });

  const handleConfirmPassword = () => {
    requestChangePassword({});
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isVerify || isSuccess) {
    navigation.pop();
    navigation.navigate(Paths.CHANGE_PASS);
  }

  return (
    <Stack bgColor={'white'} height={'100%'} p={6} width={'100%'}>
      <Text color={'primary.600'} fontWeight={600} fontSize={22}>
        Request Change Password
      </Text>
      <Text my={3} color={'gray.700'}>
        Confirm the email associated with your account and we’ll send you instructions to reset your
        password.
      </Text>
      <FormControl>
        <Input
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="primary.500" />
          }
          placeholder="Email"
          isDisabled
          isReadOnly
          value={email}
        />
      </FormControl>
      <Button mt={4} bgColor={'primary.50'} onPress={handleConfirmPassword}>
        Send
      </Button>
      <Button mt={4} variant="outline" onPress={() => setIsVerify(true)}>
        Already has a verify code? Click here!
      </Button>
    </Stack>
  );
};

export default EmailVerify;
