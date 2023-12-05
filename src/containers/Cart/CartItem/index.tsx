import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Cart,
  useAddProductToCart,
  useDecreaseProductCart,
  useDeleteProductCart,
  useGetCart,
} from '@queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, formatMoney, useToastify } from '@shared';
import { HStack, Icon, Image, Text, VStack } from 'native-base';
import { memo, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { QuantityOptions } from './helpers';
import InputStepper from '@components/InputStepper';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CART> & {
  cart: Cart;
};

const CartItem = ({ cart, navigation }: Props) => {
  const { showError, showSuccess } = useToastify();
  const [storeId, setStoreId] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { handleInvalidateCart } = useGetCart({ storeId: storeId });
  const { addProduct: increaseProduct, isLoading: isUpdateProductQuantity } = useAddProductToCart({
    onSuccess() {
      handleInvalidateCart();
    },
    onError(error) {
      showError(error.message);
    },
  });
  const { decreaseProduct, isLoading: isDecreaseProductQuantity } = useDecreaseProductCart({
    onSuccess() {
      handleInvalidateCart();
    },
    onError(error) {
      showError(error.message);
    },
  });
  const { deleteProductCart, isLoading: isDeletingProductCart } = useDeleteProductCart({
    onSuccess() {
      showSuccess('Deleted successfully!');
      handleInvalidateCart();
    },
    onError(error) {
      showError(error.message);
    },
  });

  const isMaxQuantity = cart.quantity >= cart.productStore.amount;

  const handleChangeProductQuantity = (
    productId: string,
    quantity: string,
    type: QuantityOptions,
  ) => {
    if (type === QuantityOptions.INCREASE) {
      increaseProduct({ quantity, productId });
    }

    if (type === QuantityOptions.DECREASE) {
      decreaseProduct({ quantity, productId });
    }
  };

  const handleIncrease = () => {
    !isMaxQuantity && handleChangeProductQuantity(cart.productId, '1', QuantityOptions.INCREASE);
  };

  const handleDecrease = () => {
    if (cart.quantity === 1) {
      deleteProductCart({ productId: cart.productId });
    } else handleChangeProductQuantity(cart.productId, '1', QuantityOptions.DECREASE);
  };

  return (
    <HStack
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 8,
        margin: 4,
        marginHorizontal: 8,
        gap: 4,
      }}
    >
      <Image
        source={cart.image ? { uri: cart.image } : IMAGES.noPhoto}
        alt={cart.product.name}
        size="sm"
        borderRadius={8}
        opacity={cart.inOfStock ? 100 : 30}
      />
      <VStack
        style={{
          width: '73%',
        }}
      >
        <HStack style={{ justifyContent: 'space-between', gap: 4 }}>
          <VStack>
            <Text
              numberOfLines={2}
              style={{ color: cart.inOfStock ? ColorCode.GREY_900 : ColorCode.GREY_400 }}
            >
              {cart.product.name}
            </Text>
            {!cart.inOfStock && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: ColorCode.DANGER,
                  paddingLeft: 8,
                }}
              >
                Out of stock
              </Text>
            )}
          </VStack>
          <TouchableOpacity
            style={{ justifyContent: 'flex-start', paddingTop: 4 }}
            onPress={() => deleteProductCart({ productId: cart.productId })}
          >
            <Icon as={<MaterialIcons name="close" />} size={5} />
          </TouchableOpacity>
        </HStack>
        <HStack style={{ justifyContent: 'space-between', gap: 4, paddingTop: 8 }}>
          <InputStepper
            value={cart.quantity}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            disableIncrease={isMaxQuantity}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: cart.inOfStock ? ColorCode.PRIMARY : ColorCode.PRIMARY_300,
            }}
          >
            {formatMoney(cart.product.price)}
          </Text>
        </HStack>
        <Text style={{ fontSize: 10, textAlign: 'right' }}>
          {cart.productStore.amount} items left
        </Text>
      </VStack>
    </HStack>
  );
};

export default memo(CartItem);
