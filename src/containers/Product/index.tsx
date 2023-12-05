import { Paths, RootStackParamList } from '@appConfig/paths';
import { ProductResponse, useGetAllProductLazy } from '@queries/Product';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty, useToastify } from '@shared';
import { FlatList, Text, View } from 'native-base';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import ProductItem from './ProductItem';

type Props = NativeStackScreenProps<RootStackParamList, Paths.PRODUCT>;

const Product = ({ navigation, route }: Props) => {
  const { showError } = useToastify();
  const { categoryId, categoryName, searchText } = route.params;

  const { productData, setParams, fetchNextPage, setInputSearch } = useGetAllProductLazy({
    onError: (error) => showError(error.message),
  });

  useEffect(() => {
    setParams({
      ...(categoryId && { categories: categoryId }),
    });
    setInputSearch(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndReach = () => {
    fetchNextPage();
  };

  const handlePress = (item: ProductResponse) => {
    navigation.navigate(Paths.PRODUCT_DETAIL, { productId: item.id });
  };

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
      }}
    >
      {!isEmpty(productData) ? (
        <FlatList
          data={productData}
          numColumns={2}
          onEndReached={handleEndReach}
          keyExtractor={(item) => item.id.toString()}
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
              <ProductItem product={item} navigation={navigation} route={route} />
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
