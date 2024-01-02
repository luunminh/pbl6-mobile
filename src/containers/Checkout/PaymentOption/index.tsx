import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { PaymentMethodTitle } from '@queries';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = {
  viewOnly?: boolean;
  paymentMethod: string;
  navigation?: NativeStackNavigationProp<RootStackParamList, Paths.CHECKOUT>;
};

const PaymentOption = ({ viewOnly, paymentMethod, navigation }: Props) => {
  const handleChange = () => {
    navigation.navigate(Paths.CHOOSE_PAYMENT);
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
          <Icon as={<MaterialIcons name="attach-money" />} size={5} color="primary.400" />
          <Text fontWeight="bold">Payment Option</Text>
        </HStack>
        {!viewOnly && (
          <TouchableOpacity onPress={handleChange} style={{ borderRadius: 16 }}>
            <Icon as={<MaterialIcons name="arrow-forward-ios" />} size={4} color="primary.400" />
          </TouchableOpacity>
        )}
      </HStack>
      <Text paddingLeft={6}>{PaymentMethodTitle[paymentMethod]}</Text>
    </VStack>
  );
};

export default PaymentOption;
