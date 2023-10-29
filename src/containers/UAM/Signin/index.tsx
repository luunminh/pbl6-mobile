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
import { useFormik, Form } from 'formik';
import { SignInFormField, SignInFormSchema, SignInFormType, signInInitialValues } from './helpers';
import { useLogin } from '@queries';
import { AuthService, isEmpty } from '@shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appConfig/paths';
import { Paths } from '@appConfig/paths';
import { LoadingContainer } from 'src/containers/StartupContainers';
import { setAuthenticated, setCurrentRole, setProfile } from '@redux/auth/authSlice';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '@redux/store';
import { useToastify } from '@shared/hooks';

type Props = NativeStackScreenProps<RootStackParamList, Paths.SIGN_IN> &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const SignIn = ({ navigation, route, isAuthenticated }: Props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { showSuccess, showError } = useToastify();

  const handleOnSubmit = (payload: SignInFormType) => {
    login(payload);
  };

  const { touched, errors, getFieldProps, handleSubmit, handleChange } = useFormik<SignInFormType>({
    initialValues: signInInitialValues,
    validationSchema: SignInFormSchema,
    onSubmit: handleOnSubmit,
  });

  const { isLoading, login, isError } = useLogin({
    onSuccess: async (data) => {
      await AuthService.setToken(data.accessToken);
      dispatch(setAuthenticated(true));

      setTimeout(() => {
        navigation.navigate(Paths.HOME);
      }, 2000);
    },
    onError: (error) => showError(error.message),
  });

  if (isLoading && !isError) {
    return <LoadingContainer />;
  }

  return (
    <Center bgColor={'white'} height={'100%'} width={'100%'}>
      <VStack space={10}>
        <VStack space={4} alignItems={'center'}>
          <Image size="90px" source={IMAGES.logo} alt="" />
          <Text fontSize={24} color={'primary.700'} fontWeight={'medium'}>
            Welcome Back!
          </Text>
          <Text>Login to your account</Text>
        </VStack>
        <VStack space={4} mt={8} w={'300'}>
          <FormControl isInvalid={!isEmpty(errors.username) && touched.username}>
            <Input
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="primary.500" />
              }
              placeholder="Username"
              onChangeText={handleChange('username')}
              {...getFieldProps(SignInFormField.USERNAME)}
            />
            <FormControl.ErrorMessage>{errors.username}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!isEmpty(errors.password) && touched.password}>
            <Input
              {...getFieldProps(SignInFormField.PASSWORD)}
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
              placeholder="Password"
              onChangeText={handleChange('password')}
            />
            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
          </FormControl>
          <VStack w={'300px'} alignItems={'flex-end'}>
            <Link>
              <Text color="primary.500" onPress={() => navigation.navigate(Paths.FORGOT_PASS)}>
                Forgot password?
              </Text>
            </Link>
          </VStack>
          <Button variant={'solid'} bgColor={'primary.50'} onPress={(e) => handleSubmit()}>
            Login
          </Button>
          <Stack flexDirection={'row'} justifyContent={'center'}>
            <Text color={'gray.600'}>Don’t have an account? </Text>
            <Link onPress={() => navigation.navigate(Paths.SIGN_UP)}>
              <Text bgColor={'red'} color={'primary.500'}>
                Sign up
              </Text>
            </Link>
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
};

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onSetAuth: setAuthenticated,
  onSetCurrentRole: setCurrentRole,
  onSetProfile: setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
