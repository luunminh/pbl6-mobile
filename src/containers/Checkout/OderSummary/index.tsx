import { SHIPPING_FEE } from '@appConfig/constants';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { Cart } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatMoney } from '@shared';
import { Divider, HStack, Icon, Text, VStack } from 'native-base';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { VoucherContext } from 'src/context';
import OrderItem from './OrderItem';
import { getDiscount } from './helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT> & {
  cart?: Cart[];
  subTotal?: number;
  total?: number;
};

const OderSummary = ({ navigation, cart, subTotal, total }: Props) => {
  const { selectedVoucher } = useContext(VoucherContext);

  const handleBackToCart = () => {
    navigation.goBack();
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
        gap: 8,
      }}
    >
      <HStack style={{ justifyContent: 'space-between', marginBottom: 4 }}>
        <HStack style={{ gap: 4, alignItems: 'center' }}>
          <Icon as={<MaterialIcons name="list-alt" />} size={5} color="primary.400" />
          <Text fontWeight="bold">Oder Summary</Text>
        </HStack>
        <TouchableOpacity onPress={handleBackToCart} style={{ borderRadius: 16 }}>
          <Text color="primary.400" fontWeight="bold">
            Add more
          </Text>
        </TouchableOpacity>
      </HStack>
      <VStack style={{ gap: 4 }}>
        {cart?.map((item) => <OrderItem key={item.id} cart={item} />)}
      </VStack>
      <Divider />
      <VStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Sub Total:</Text>
          <Text textAlign="right">{formatMoney(subTotal || 0)}</Text>
        </HStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Shipping Fee:</Text>
          <Text textAlign="right">{formatMoney(SHIPPING_FEE)}</Text>
        </HStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Discount:</Text>
          <Text textAlign="right">{formatMoney(getDiscount(selectedVoucher, subTotal))}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default OderSummary;
