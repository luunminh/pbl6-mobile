import { SHIPPING_FEE } from '@appConfig/constants';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { MaterialIcons } from '@expo/vector-icons';
import { VoucherResponse, VoucherType, useGetCart } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, formatMoney, isEmpty } from '@shared';
import { Divider, HStack, Icon, Text, VStack } from 'native-base';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { VoucherContext } from 'src/context';
import OrderItem from './OrderItem';
import { getDiscount } from './helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const OderSummary = ({ navigation, route }: Props) => {
  const [storeId, setStoreId] = useState<string>(null);
  const { selectedVoucher, setSelectedVoucherId } = useContext(VoucherContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { cart, handleInvalidateCart, isLoading } = useGetCart({ storeId: storeId });

  const handleBackToCart = () => {
    navigation.goBack();
  };

  const subTotal = useMemo(
    () =>
      cart
        ?.filter((product) => product.inOfStock)
        .reduce((total, curProduct) => total + curProduct.price, 0),
    [cart],
  );

  const total = useMemo(
    () => subTotal + SHIPPING_FEE - getDiscount(selectedVoucher, subTotal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedVoucher, subTotal],
  );

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
