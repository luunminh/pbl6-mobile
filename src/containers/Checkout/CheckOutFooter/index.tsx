import { SHIPPING_FEE } from '@appConfig/constants';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Button } from '@components';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetCart } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Callback, StoreService, formatMoney, isEmpty } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { getDiscount } from '../OderSummary/helpers';
import { VoucherContext } from 'src/context';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT> & {
  handleOrder: Callback;
};

const CheckOutFooter = ({ navigation, route, handleOrder }: Props) => {
  const { selectedVoucher } = useContext(VoucherContext);
  const [storeId, setStoreId] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { cart } = useGetCart({ storeId: storeId });

  const subTotal: number = useMemo(
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

  const handlePress = () => {
    handleOrder();
  };

  return (
    <VStack
      style={{
        backgroundColor: ColorCode.WHITE,
        paddingHorizontal: 24,
        paddingVertical: 16,
        gap: 8,
      }}
    >
      <HStack
        style={{
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Total:</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: ColorCode.PRIMARY }}>
          {formatMoney(total)}
        </Text>
      </HStack>
      <Button handlePress={handlePress} disable={isEmpty(cart)} label="Place Order" />
    </VStack>
  );
};

export default CheckOutFooter;
