import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { useGetProductById } from '@queries/Product';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService, formatMoney, useToastify } from '@shared';
import { Button, Center, Text, View, Image } from 'native-base';
import React from 'react';
import { LoadingContainer } from '../StartupContainers';
type Props = NativeStackScreenProps<RootStackParamList, Paths.PRODUCT_DETAIL>;

const ProductDetail = ({ navigation, route }: Props) => {
  const { productId } = route.params;
  const { showError } = useToastify();

  const { productData, isLoadingProduct } = useGetProductById({
    onError: (error) => showError(error.message),
    id: productId,
  });

  if (isLoadingProduct) return <LoadingContainer />;

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: ColorCode.WHITE,
        flex: 1,
        padding: 16,
        paddingTop: 0,
      }}
    >
      <Image
        source={productData.image ? { uri: productData.image } : IMAGES.noPhoto}
        alt={productData.name}
        size="2xl"
        borderRadius={32}
        alignSelf="center"
      />
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>{productData.name}</Text>
      <Text
        style={{ fontWeight: 'bold', fontSize: 18, color: ColorCode.RED_500, marginVertical: 16 }}
      >
        {formatMoney(productData.price)}
      </Text>
      <Button>Add to Cart</Button>
      <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>Description: </Text>
      <Text style={{ fontSize: 14 }}>{productData.description}</Text>
    </View>
  );
};

export default ProductDetail;
