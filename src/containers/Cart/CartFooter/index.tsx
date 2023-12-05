import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetCart } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, formatMoney, isEmpty } from '@shared';
import { Button, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CART>;

const CartFooter = ({ navigation, route }: Props) => {
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

  const handlePress = () => {
    navigation.navigate(Paths.CHECKOUT);
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
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{formatMoney(subTotal)}</Text>
      </HStack>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isEmpty(cart)}
        style={{ backgroundColor: ColorCode.PRIMARY, padding: 12, borderRadius: 16 }}
      >
        <Text color="white" fontWeight="bold" textAlign="center">
          Checkout
        </Text>
      </TouchableOpacity>
    </VStack>
  );
};

export default CartFooter;
