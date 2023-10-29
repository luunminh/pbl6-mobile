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
  FormControl,
  Select,
  CheckIcon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useFormik, Form } from 'formik';
import { SignUpFormField, SignUpFormType, signUpFormSchema, signUpInitialValue } from './helpers';
import { useLogin, useSignUp } from '@queries';
import { AuthService, GenderValue, isEmpty } from '@shared';
import { RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Paths } from '@appConfig/paths';
import { useToastify } from '@shared/hooks';
import { setAuthenticated } from '@redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { LoadingContainer } from 'src/containers/StartupContainers';
import { SignInFormField } from '../SignIn/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.SIGN_UP>;

const SignUp = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { showError, showSuccess } = useToastify();

  const handleOnSubmit = (formValue: SignUpFormType) => {
    signup({ ...formValue, username: formValue.email, gender: +formValue.gender });
  };

  const { touched, errors, getFieldProps, handleSubmit, handleChange, setFieldValue } =
    useFormik<SignUpFormType>({
      initialValues: signUpInitialValue,
      validationSchema: signUpFormSchema,
      onSubmit: handleOnSubmit,
    });

  const { isLoading, signup, isSuccess } = useSignUp({
    onSuccess: (data) => {
      showSuccess('Created successfully!');
      AuthService.setToken(data.accessToken);
      dispatch(setAuthenticated(true));
    },
    onError: (error) => {
      if (typeof error.message === 'string') {
        showError(error.message);
      } else {
        for (const msg of error?.message as Array<string>) {
          showError(msg);
        }
      }
    },
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return isSuccess ? (
    <Center bgColor={'white'} height={'100%'} width={'100%'} p={10}>
      <Text fontSize={33} color={'primary.50'} fontWeight={700} mb={1} textAlign={'center'}>
        Congratulations!
      </Text>
      <Text color={'gray.700'} fontSize={14} mb={10}>
        Your account has been successfully created!
      </Text>
      <Button
        width={'300px'}
        bgColor={'primary.50'}
        onPress={() => navigation.navigate(Paths.HOME)}
      >
        Go to Homepage
      </Button>
    </Center>
  ) : (
    <Center bgColor={'white'} height={'100%'} width={'100%'}>
      <VStack space={8}>
        <VStack space={4} alignItems={'center'}>
          <Text fontSize={24} color={'primary.600'} fontWeight={'medium'}>
            Create Account
          </Text>
        </VStack>
        <VStack space={4} mt={8} w={'300'}>
          <VStack justifyContent={'space-between'} flexDirection={'row'}>
            <FormControl isInvalid={!isEmpty(errors.firstName) && touched.firstName} w={'48%'}>
              <Input
                InputLeftElement={
                  <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="primary.500" />
                }
                placeholder="First name"
                onChangeText={handleChange('firstName')}
                {...getFieldProps(SignUpFormField.FIRST_NAME)}
              />
              <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(errors.lastName) && touched.lastName} w={'48%'}>
              <Input
                InputLeftElement={
                  <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="primary.500" />
                }
                placeholder="Last name"
                onChangeText={handleChange('lastName')}
                {...getFieldProps(SignUpFormField.LAST_NAME)}
              />
              <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <FormControl isInvalid={!isEmpty(errors.email) && touched.email}>
            <Input
              InputLeftElement={
                <Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="primary.500" />
              }
              placeholder="Email"
              onChangeText={handleChange('email')}
              {...getFieldProps(SignUpFormField.EMAIL)}
            />
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!isEmpty(errors.password) && touched.password}>
            <Input
              {...getFieldProps(SignUpFormField.PASSWORD)}
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
          <Select
            minWidth="200"
            accessibilityLabel="Gender"
            placeholder="Gender"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(value) => setFieldValue(SignUpFormField.GENDER, value)}
          >
            <Select.Item label="Male" value={GenderValue.MALE.toString()} />
            <Select.Item label="Female" value={GenderValue.FEMALE.toString()} />
          </Select>
          <FormControl isInvalid={!isEmpty(errors.phone) && touched.phone}>
            <Input
              InputLeftElement={
                <Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="primary.500" />
              }
              placeholder="phone"
              onChangeText={handleChange('phone')}
              {...getFieldProps(SignUpFormField.PHONE)}
            />
            <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage>
          </FormControl>
          <Button variant={'solid'} onPress={(e) => handleSubmit()}>
            Continue
          </Button>
        </VStack>
      </VStack>
    </Center>
  );
};

export default SignUp;
