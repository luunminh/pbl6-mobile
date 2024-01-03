import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { InputStepper } from '@components';
import {
  useAddProductToCart,
  useDecreaseProductCart,
  useDeleteProductCart,
  useGetCart,
} from '@queries';
import { ProductResponse } from '@queries/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, formatMoney, useToastify } from '@shared';
import { Box, Button, Image, Text } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { QuantityOptions } from 'src/containers/Cart/CartItem/helpers';

type Props = {
  product: ProductResponse;
  storeId: string;
};

const ProductItem = ({ product, storeId }: Props) => {
  const { showError, showSuccess } = useToastify();

  const { cart } = useGetCart({ storeId: storeId });

  const { handleInvalidateCart } = useGetCart({ storeId: storeId });
  const { addProduct: increaseProduct, isLoading: isUpdateProductQuantity } = useAddProductToCart({
    onSuccess() {
      handleInvalidateCart();
      showSuccess('Added to your cart!');
    },
    onError(error) {
      showError(error.message);
    },
  });

  const handleAddCart = () => {
    increaseProduct({ quantity: '1', productId: product.id });
  };

  const { decreaseProduct } = useDecreaseProductCart({
    onSuccess() {
      handleInvalidateCart();
    },
    onError(error) {
      showError(error.message);
    },
  });
  const { deleteProductCart } = useDeleteProductCart({
    onSuccess() {
      showSuccess('Deleted successfully!');
      handleInvalidateCart();
    },
    onError(error) {
      showError(error.message);
    },
  });

  const cartItem = useMemo(
    () => cart?.find((cartItem) => cartItem.productId === product.id),
    [cart],
  );

  const isMaxQuantity = cartItem?.quantity >= cartItem?.productStore.amount;

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
    !isMaxQuantity &&
      handleChangeProductQuantity(cartItem?.productId, '1', QuantityOptions.INCREASE);
  };

  const handleDecrease = () => {
    if (cartItem?.quantity === 1) {
      deleteProductCart({ productId: cartItem?.productId });
    } else handleChangeProductQuantity(cartItem?.productId, '1', QuantityOptions.DECREASE);
  };

  return (
    <Box
      style={{
        backgroundColor: ColorCode.WHITE,
        borderRadius: 16,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
    >
      <Image
        source={product.image ? { uri: product.image } : IMAGES.noPhoto}
        alt={product.name}
        size="xl"
        borderRadius={32}
        mb={2}
      />
      <Text numberOfLines={2} style={{ textAlign: 'left', fontWeight: 'bold' }} height={10}>
        {product.name}
      </Text>
      <Text
        marginTop={1}
        marginBottom={-1}
        numberOfLines={2}
        style={{ textAlign: 'left', fontSize: 12, lineHeight: 18 }}
        height={12}
      >
        {product.description}
      </Text>
      <Text style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: 8, fontSize: 16 }}>
        {formatMoney(product.price)}
      </Text>
      {!!cartItem ? (
        <InputStepper
          value={cartItem.quantity}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          disableIncrease={isMaxQuantity}
        />
      ) : (
        <Button
          onPress={handleAddCart}
          disabled={product?.productStore?.amount === 0}
          textAlign={'center'}
          width={'160px'}
        >
          Add to Cart
        </Button>
      )}
    </Box>
  );
};

export default ProductItem;
