import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { ContactType } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DeliveryInfoService, isEmpty } from '@shared';
import { useToastify } from '@shared/hooks';
import { useFormik } from 'formik';
import { Button, FormControl, Icon, Input, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DeliveryFormField, deliverySchema } from './helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.EDIT_DELIVERY>;

const EditDeliveryInfo = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const { showError } = useToastify();

  const handleUpdateProfile = async (formValue: ContactType) => {
    try {
      await DeliveryInfoService.setAddress(formValue.address);
      await DeliveryInfoService.setFirstName(formValue.firstName);
      await DeliveryInfoService.setLastName(formValue.lastName);
      await DeliveryInfoService.setPhone(formValue.phoneNumber);
      navigation.goBack();
    } catch (error) {
      showError(error);
    }
  };

  const { errors, touched, getFieldProps, handleSubmit, handleChange, setFieldValue } =
    useFormik<ContactType>({
      initialValues: contact,
      onSubmit: handleUpdateProfile,
      validationSchema: deliverySchema,
      enableReinitialize: true,
    });

  return (
    <VStack bgColor={'white'} height={'100%'} width={'100%'} alignItems={'center'}>
      <KeyboardAwareScrollView>
        <VStack space={1}>
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
                  onChangeText={(text: string) => setFieldValue(DeliveryFormField.FIRST_NAME, text)}
                  {...getFieldProps(DeliveryFormField.FIRST_NAME)}
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
                  onChangeText={(text: string) => setFieldValue(DeliveryFormField.LAST_NAME, text)}
                  {...getFieldProps(DeliveryFormField.LAST_NAME)}
                />
                <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
              </FormControl>
            </VStack>
            <FormControl isInvalid={!isEmpty(errors.phoneNumber) && touched.phoneNumber}>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="primary.500" />
                }
                placeholder="phone"
                onChangeText={(text: string) => setFieldValue(DeliveryFormField.PHONE, text)}
                {...getFieldProps(DeliveryFormField.PHONE)}
              />
              <FormControl.ErrorMessage>{errors.phoneNumber}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(errors.address) && touched.address}>
              <FormControl.Label>Address</FormControl.Label>
              <Input
                multiline
                numberOfLines={3}
                placeholder="Address"
                onChangeText={(text: string) => setFieldValue(DeliveryFormField.ADDRESS, text)}
                {...getFieldProps(DeliveryFormField.ADDRESS)}
              />
              <FormControl.ErrorMessage>{errors.address}</FormControl.ErrorMessage>
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

export default EditDeliveryInfo;
