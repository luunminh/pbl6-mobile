import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { CategoryListResponse, useGetAllCategoryLazy } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToastify } from '@shared';
import { FlatList, View } from 'native-base';
import { useEffect } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import CategoryItem from './CategoryItem';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CATEGORY>;

const Category = ({ navigation, route }: Props) => {
  const { showError } = useToastify();

  const { categoryData, setParams, fetchNextPage, handleInvalidateCategories, loading } =
    useGetAllCategoryLazy({
      onError: (error) => showError(error.message),
    });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndReach = () => {
    fetchNextPage();
  };

  const handlePress = (item: CategoryListResponse) => {
    navigation.navigate(Paths.PRODUCT, { categoryId: item.id, categoryName: item.name });
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: ColorCode.WHITE,
        flex: 1,
      }}
    >
      <FlatList
        data={categoryData}
        numColumns={2}
        onEndReached={handleEndReach}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleInvalidateCategories} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(item)}
            style={{
              width: '50%',
              padding: 8,
              alignItems: 'center',
            }}
          >
            <CategoryItem category={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;
