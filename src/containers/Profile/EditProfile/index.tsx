import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { UpdateProfilePayload, useUpdateProfile } from '@queries';
import { useUploadAvatar } from '@queries/File';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GenderValue, isEmpty } from '@shared';
import { useToastify } from '@shared/hooks';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import {
  Button,
  CheckIcon,
  FormControl,
  Icon,
  Input,
  Select,
  Text,
  VStack
} from 'native-base';
import { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoadingContainer } from 'src/containers/StartupContainers';
import { ProfileFormField, ProfileFormSchema, ProfileFormType } from './helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.EDIT_PROFILE>;

const EditProfile = ({ navigation, route }: Props) => {
  const { showError, showSuccess } = useToastify();
  const [avatar, setAvatar] = useState(null);

  const { profile, isLoading, handleInvalidateProfile } = useGetProfile({
    onErrorCallback: (error) => showError(error?.message),
  });
  const {
    uploadAvatar,
    isLoading: isUploadingAvatar,
    isSuccess,
  } = useUploadAvatar({
    onSuccess({ data }) {
      updateProfile({ avatarUrl: data.url });
    },
    onError(error) {
      showError(error.message);
    },
  });

  useEffect(() => {}, [isSuccess]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      uploadAvatar({ file });
    }
  };

  const {
    updateProfile,
    isLoading: isLoadingUpdate,
    isSuccess: isUpdateProfileSuccess,
  } = useUpdateProfile({
    onSuccess: () => {
      handleInvalidateProfile();
      showSuccess('Update Successfully!');
      navigation.popToTop();
    },
    onError: (error) => showError(error?.message),
  });

  const handleUpdateProfile = (formValue: UpdateProfilePayload) => {
    const { address, firstName, lastName, phone, gender, email } = formValue;
    updateProfile({ address, firstName, lastName, phone, gender: +gender, email });
  };

  useEffect(() => {
    if (isUpdateProfileSuccess) {
      handleInvalidateProfile();
    }
  }, [isUpdateProfileSuccess]);

  const { values, errors, touched, getFieldProps, handleSubmit, handleChange, setFieldValue } =
    useFormik<ProfileFormType>({
      initialValues: profile,
      onSubmit: handleUpdateProfile,
      validationSchema: ProfileFormSchema,
      enableReinitialize: true,
    });

  if (isLoading || isLoadingUpdate) {
    return <LoadingContainer />;
  }

  return (
    <VStack bgColor={'white'} height={'100%'} width={'100%'} alignItems={'center'}>
      <KeyboardAwareScrollView>
        <VStack space={1}>
          <VStack space={4} alignItems={'start'}>
            <Text fontSize={24} color={'primary.600'} fontWeight={'medium'}>
              Update Profile
            </Text>
          </VStack>
          <VStack space={1} mt={4} w={'350'}>
            <VStack justifyContent={'space-between'} flexDirection={'row'}>
              <FormControl
                isRequired
                isInvalid={!isEmpty(errors.firstName) && touched.firstName}
                w={'48%'}
              >
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="primary.500"
                    />
                  }
                  placeholder="First name"
                  onChangeText={handleChange('firstName')}
                  {...getFieldProps(ProfileFormField.FIRST_NAME)}
                />
                <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!isEmpty(errors.lastName) && touched.lastName}
                w={'48%'}
              >
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="primary.500"
                    />
                  }
                  placeholder="Last name"
                  onChangeText={handleChange('lastName')}
                  {...getFieldProps(ProfileFormField.LAST_NAME)}
                />
                <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
              </FormControl>
            </VStack>
            <FormControl isRequired isInvalid={!isEmpty(errors.email) && touched.email}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="primary.500" />
                }
                placeholder="Email"
                onChangeText={handleChange('email')}
                {...getFieldProps(ProfileFormField.EMAIL)}
              />
              <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>Gender</FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Gender"
                placeholder="Gender"
                _selectedItem={{
                  endIcon: <CheckIcon size="5" />,
                }}
                defaultValue={values[ProfileFormField.GENDER].toString()}
                mt={1}
                onValueChange={(value) => setFieldValue(ProfileFormField.GENDER, value)}
              >
                <Select.Item label="Male" value={GenderValue.MALE.toString()} />
                <Select.Item label="Female" value={GenderValue.FEMALE.toString()} />
              </Select>
            </FormControl>

            <FormControl isInvalid={!isEmpty(errors.phone) && touched.phone}>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="primary.500" />
                }
                placeholder="phone"
                onChangeText={handleChange('phone')}
                {...getFieldProps(ProfileFormField.PHONE)}
              />
              <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(errors.address) && touched.address}>
              <FormControl.Label>Address</FormControl.Label>
              <Input
                multiline
                placeholder="Address"
                onChangeText={handleChange('address')}
                {...getFieldProps(ProfileFormField.ADDRESS)}
              />
              <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage>
            </FormControl>
            <Button bgColor={'primary.50'} mt={5} variant={'solid'} onPress={(e) => handleSubmit()}>
              Save
            </Button>
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default EditProfile;
