import { Paths, RootStackParamList } from '@appConfig/paths';
import { Button } from '@components';
import { MaterialIcons } from '@expo/vector-icons';
import { ContactType, useGetProfile } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToastify } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT> & {
  contact: ContactType;
};

const GeneralInformation = ({ navigation, route, contact }: Props) => {
  const handleChange = () => {
    navigation.navigate(Paths.EDIT_DELIVERY, { contact: contact });
  };

  return (
    <VStack
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        marginHorizontal: 8,
      }}
    >
      <HStack style={{ justifyContent: 'space-between', marginBottom: 4 }}>
        <HStack style={{ gap: 4 }}>
          <Icon as={<MaterialIcons name="location-pin" />} size={5} color="primary.400" />
          <Text fontWeight="bold">Delivery to</Text>
        </HStack>
        <TouchableOpacity onPress={handleChange} style={{ borderRadius: 16 }}>
          <Icon as={<MaterialIcons name="edit" />} size={5} color="primary.400" />
        </TouchableOpacity>
      </HStack>
      <Text fontSize={14} paddingLeft={6}>
        {contact?.firstName} {contact?.lastName} - {contact?.phoneNumber}
      </Text>
      <Text fontSize={14} paddingLeft={6}>
        {contact?.address}
      </Text>
    </VStack>
  );
};

export default GeneralInformation;
