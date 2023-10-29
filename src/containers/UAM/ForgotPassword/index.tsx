import { IMAGES } from '@appConfig/images';
import { Input, Icon, Text, Button, Stack, useToast, FormControl } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useFormik } from 'formik';

import { useForgotPassword, useLogin } from '@queries';
import { isEmpty } from '@shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appConfig/paths';
import { Paths } from '@appConfig/paths';
import {
  ForgotPasswordFormField,
  ForgotPasswordFormType,
  ForgotPasswordSchema,
  forgotPasswordInitialValues,
} from './helpers';
import { useToastify } from '@shared/hooks';
import { LoadingContainer } from 'src/containers/StartupContainers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.FORGOT_PASS>;
const ForgotPassword = ({ navigation, route }: Props) => {
  const { showError } = useToastify();
  const { forgotPassword, isLoading } = useForgotPassword({
    onSuccess: () => {
      navigation.navigate(Paths.RESET_PASS);
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  const handleForgotPassword = (payload: ForgotPasswordFormType) => {
    forgotPassword(payload);
  };

  const { touched, errors, getFieldProps, handleSubmit, handleChange } =
    useFormik<ForgotPasswordFormType>({
      initialValues: forgotPasswordInitialValues,
      onSubmit: handleForgotPassword,
      validationSchema: ForgotPasswordSchema,
    });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <Stack bgColor={'white'} height={'100%'} p={6} width={'100%'}>
      <Text color={'primary.600'} fontWeight={600} fontSize={22}>
        Forgot Password
      </Text>
      <Text my={2} color={'gray.700'}>
        Please enter your email address to receive a verification code
      </Text>
      <FormControl isInvalid={!isEmpty(errors.email) && touched.email}>
        <Input
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="primary.500" />
          }
          placeholder="Email"
          onChangeText={handleChange('email')}
          {...getFieldProps(ForgotPasswordFormField.EMAIL)}
        />
        <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
      </FormControl>
      <Button mt={4} bgColor={'primary.50'} onPress={() => handleSubmit()}>
        Send
      </Button>
    </Stack>
  );
};

export default ForgotPassword;
