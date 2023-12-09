import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { TopSaleResponse, useGetProductTopSale } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, isEmpty, useToastify } from '@shared';
import { Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import ProductItem from 'src/containers/Product/ProductItem';
import { LoadingContainer } from 'src/containers/StartupContainers';

type Props = NativeStackScreenProps<RootStackParamList, Paths.HOME>;

const TopSale = ({ navigation, route }: Props) => {
  const { showError } = useToastify();
  const [storeId, setStoreId] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { topSale, isLoading, handleInvalidateProducts } = useGetProductTopSale({
    onError(err) {
      showError(err.message);
    },
    storeId: storeId,
  });

  const handlePress = (item: TopSaleResponse) => {
    navigation.navigate(Paths.PRODUCT_DETAIL, { productId: item.product.id });
  };

  return (
    <VStack
      style={{
        backgroundColor: ColorCode.WHITE,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 16 }}>Top Selling</Text>
      {!isEmpty(topSale) && (
        <FlatList
          data={topSale}
          numColumns={2}
          keyExtractor={(item) => item.product.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleInvalidateProducts} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.product.id}
              onPress={() => handlePress(item)}
              style={{
                width: '50%',
                padding: 6,
                alignItems: 'center',
              }}
            >
              <ProductItem storeId={storeId} product={item.product} />
            </TouchableOpacity>
          )}
        />
      )}
    </VStack>
  );
};

export default TopSale;
