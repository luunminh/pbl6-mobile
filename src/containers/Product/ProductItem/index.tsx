import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Button, InputStepper } from '@components';
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
import { Box, Image, Text } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { QuantityOptions } from 'src/containers/Cart/CartItem/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.PRODUCT> & {
  product: ProductResponse;
  storeId: string;
};

const ProductItem = ({ product, navigation, storeId }: Props) => {
  const { showError, showSuccess } = useToastify();

  const { cart } = useGetCart({ storeId: storeId });

  const { handleInvalidateCart } = useGetCart({ storeId: storeId });
  const { addProduct: increaseProduct, isLoading: isUpdateProductQuantity } = useAddProductToCart({
    onSuccess() {
      handleInvalidateCart();
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
        padding: 8,
      }}
    >
      <Image
        source={product.image ? { uri: product.image } : IMAGES.noPhoto}
        alt={product.name}
        size="xl"
        borderRadius={32}
      />
      <Text numberOfLines={2} style={{ fontWeight: 'bold', textAlign: 'center' }}>
        {product.name}
      </Text>
      <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 12 }}>
        {product.description}
      </Text>
      <Text style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
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
          handlePress={handleAddCart}
          disable={product?.productStore?.amount === 0}
          label="Add to Cart"
        />
      )}
    </Box>
  );
};

export default ProductItem;
