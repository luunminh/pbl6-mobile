import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Checkbox, HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const handleChange = () => {};

const PaymentOption = ({ navigation, route }: Props) => {
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
          <Icon as={<MaterialIcons name="attach-money" />} size={5} color="primary.400" />
          <Text fontWeight="bold">Payment Option</Text>
        </HStack>
        <TouchableOpacity onPress={handleChange} style={{ borderRadius: 16 }}>
          <Icon as={<MaterialIcons name="arrow-forward-ios" />} size={4} color="primary.400" />
        </TouchableOpacity>
      </HStack>
      <Text paddingLeft={6}>Cash on Delivery (COD)</Text>
    </VStack>
  );
};

export default PaymentOption;
