import { Paths, RootStackParamList } from '@appConfig/paths';
import { ProductResponse, useGetAllProductLazy } from '@queries/Product';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, isEmpty, useToastify } from '@shared';
import { FlatList, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import ProductItem from './ProductItem';
import { LoadingContainer } from '../StartupContainers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.PRODUCT>;

const Product = ({ navigation, route }: Props) => {
  const [storeId, setStoreId] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { showError } = useToastify();
  const { categoryId, searchText } = route.params;

  const {
    productData,
    setParams,
    fetchNextPage,
    setInputSearch,
    loading,
    handleInvalidateProducts,
  } = useGetAllProductLazy({
    onError: (error) => showError(error.message),
  });

  useEffect(() => {
    setParams({
      ...(categoryId && { categories: categoryId }),
      ...(storeId && { storeId: storeId }),
    });
    setInputSearch(searchText);
  }, [storeId]);

  const handleEndReach = () => {
    fetchNextPage();
  };

  const handlePress = (item: ProductResponse) => {
    navigation.navigate(Paths.PRODUCT_DETAIL, { productId: item.id });
  };

  const productListData = storeId
    ? productData.filter((product) => product?.productStore?.amount > 0, false)
    : productData;

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
      }}
    >
      {!isEmpty(productListData) ? (
        <FlatList
          data={productListData}
          numColumns={2}
          onEndReached={handleEndReach}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleInvalidateProducts} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePress(item)}
              style={{
                width: '50%',
                padding: 6,
                alignItems: 'center',
              }}
            >
              <ProductItem storeId={storeId} product={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text textAlign="center">No Product Found</Text>
      )}
    </View>
  );
};

export default Product;
