import { Paths, RootStackParamList } from '@appConfig/paths';
import { Button } from '@components';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetProfile } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToastify } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const GeneralInformation = ({ navigation, route }: Props) => {
  const { showError, showSuccess } = useToastify();

  const { profile } = useGetProfile({
    onErrorCallback: (error) => showError(error?.message),
  });

  const handleChange = () => {};

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
        {profile?.firstName} {profile?.lastName} - {profile?.phone}
      </Text>
      <Text fontSize={14} paddingLeft={6}>
        {profile?.address}
      </Text>
    </VStack>
  );
};

export default GeneralInformation;
