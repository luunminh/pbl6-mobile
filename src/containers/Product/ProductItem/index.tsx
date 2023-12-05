import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { useAddProductToCart, useGetCart } from '@queries';
import { ProductResponse } from '@queries/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, formatMoney, useToastify } from '@shared';
import { Box, Button, Image, Text } from 'native-base';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, Paths.PRODUCT> & {
  product: ProductResponse;
};

const ProductItem = ({ product, navigation }: Props) => {
  const { showError } = useToastify();
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

  const handleAddCart = () => {
    console.log('add', product);
    increaseProduct({ quantity: '1', productId: product.id });
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
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{formatMoney(product.price)}</Text>
      <Button onPress={handleAddCart} style={{ paddingTop: 8 }}>
        Add to cart
      </Button>
    </Box>
  );
};

export default ProductItem;
