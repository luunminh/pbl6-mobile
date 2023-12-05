import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { ChangePasswordPayload, useChangePassword } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setAuthenticated } from '@redux/auth/authSlice';
import { AuthService, isEmpty } from '@shared';
import { useToastify } from '@shared/hooks';
import { useFormik } from 'formik';
import { Button, FormControl, Icon, Input, Pressable, Stack, Text } from 'native-base';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ChangePasswordFormField,
  ChangePasswordFormType,
  changePasswordSchema,
  initialChangePasswordFormValue,
} from './helpter';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHANGE_PASS>;

const ChangePassword = ({ navigation, route }: Props) => {
  const [show, setShow] = useState(false);
  const { showError, showSuccess } = useToastify();

  const dispatch = useDispatch();

  const { changePassword, isLoading, isSuccess } = useChangePassword({
    onSuccess: () => {
      async () => {
        showSuccess('Updated successfully!');
        dispatch(setAuthenticated(false));
        await AuthService.clearToken();
      };
    },
    onError: (error) => showError(error.message),
  });

  const onChangePassword = (payload: ChangePasswordPayload) => {
    changePassword(payload);
  };

  const { errors, touched, getFieldProps, handleSubmit, handleChange } =
    useFormik<ChangePasswordFormType>({
      initialValues: initialChangePasswordFormValue,
      onSubmit: onChangePassword,
      validationSchema: changePasswordSchema,
    });

  return (
    <Stack bgColor={'white'} height={'100%'} p={6} width={'100%'}>
      <Text color={'primary.600'} fontWeight={600} fontSize={22}>
        Verification
      </Text>
      <Text my={2} color={'gray.700'}>
        Please enter a verification code sent to your email address
      </Text>
      <Stack space={4} my={2}>
        <FormControl isInvalid={!isEmpty(errors.tokenResetPassword) && touched.tokenResetPassword}>
          <Input
            InputLeftElement={
              <Icon as={<MaterialIcons name="code" />} size={5} ml="2" color="primary.500" />
            }
            placeholder="Verify Code"
            onChangeText={handleChange(ChangePasswordFormField.TOKEN_RESET)}
            {...getFieldProps(ChangePasswordFormField.TOKEN_RESET)}
          />
          <FormControl.ErrorMessage>{errors.tokenResetPassword}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!isEmpty(errors.newPassword) && touched.newPassword}>
          <Input
            {...getFieldProps(ChangePasswordFormField.NEW_PASS)}
            type={show ? 'text' : 'password'}
            InputLeftElement={
              <Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="primary.500" />
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="New Password"
            onChangeText={handleChange('newPassword')}
          />
          <FormControl.ErrorMessage>{errors.newPassword}</FormControl.ErrorMessage>
        </FormControl>
      </Stack>
      <Button mt={4} bgColor={'primary.50'} onPress={(e) => handleSubmit()}>
        Continue
      </Button>
    </Stack>
  );
};

export default ChangePassword;
