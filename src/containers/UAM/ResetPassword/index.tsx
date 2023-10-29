import { IMAGES } from '@appConfig/images';
import {
  Center,
  Image,
  Input,
  Icon,
  Text,
  VStack,
  Pressable,
  Button,
  Link,
  Stack,
  useToast,
  Box,
  FormControl,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useFormik } from 'formik';

import { ChangePasswordPayload, useResetPassword } from '@queries';
import { isEmpty } from '@shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appConfig/paths';
import { Paths } from '@appConfig/paths';
import {
  ChangePasswordFormField,
  ChangePasswordFormType,
  changePasswordSchema,
  initialChangePasswordFormValue,
} from './helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.RESET_PASS>;
const ResetPassword = ({ navigation, route }: Props) => {
  const [show, setShow] = useState(false);
  const toast = useToast();

  const { resetPassword, isLoading, isSuccess } = useResetPassword({
    onSuccess: () => {
      toast.show({
        render: () => {
          return (
            <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
              {'Update successfully!'}
            </Box>
          );
        },
      });
    },
    onError: (error) =>
      toast.show({
        render: () => {
          return (
            <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
              {error.message}
            </Box>
          );
        },
      }),
  });

  const onChangePassword = (payload: ChangePasswordPayload) => {
    resetPassword(payload);
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

export default ResetPassword;
