import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { ChooseStoreHeader } from '@components';
import { Feather } from '@expo/vector-icons';
import { CategoryListResponse, useGetAllCategoryLazy } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToastify } from '@shared';
import { Box, FlatList, Image, Text, View } from 'native-base';
import { useEffect } from 'react';
import { ImageBackground, RefreshControl, TouchableOpacity } from 'react-native';
type Props = NativeStackScreenProps<RootStackParamList, Paths.HOME>;

const Home = ({ navigation, route }: Props) => {
  const { showError } = useToastify();
  const { categoryData, setParams, loading, handleInvalidateCategories } = useGetAllCategoryLazy({
    onError: (error) => showError(error.message),
  });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressCategory = (item: CategoryListResponse) => {
    if (item.id === 'more') {
      navigation.navigate(Paths.CATEGORY);
    } else {
      navigation.navigate(Paths.PRODUCT, { categoryId: item.id, categoryName: item.name });
    }
  };

  const handleSearchProduct = () => {
    navigation.navigate(Paths.SEARCH);
  };

  const categoryShowList: CategoryListResponse[] = categoryData.slice(0, 7);
  categoryShowList.push({
    _count: null,
    createdAt: null,
    description: null,
    id: 'more',
    image: null,
    name: 'More',
  });

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: ColorCode.WHITE,
        flex: 1,
      }}
    >
      <ImageBackground
        source={IMAGES.homeBg}
        style={{ width: '100%' }}
        borderBottomLeftRadius={50}
        borderBottomRightRadius={50}
      >
        <ChooseStoreHeader<Paths.HOME> navigation={navigation} />
        <TouchableOpacity
          onPress={handleSearchProduct}
          style={{
            flexDirection: 'row',
            backgroundColor: ColorCode.WHITE,
            borderColor: ColorCode.GREY_400,
            borderWidth: 1,
            marginHorizontal: 16,
            borderRadius: 16,
            padding: 8,
          }}
        >
          <Feather
            name="search"
            size={24}
            color={ColorCode.GREY_300}
            style={{ alignSelf: 'center' }}
          />
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 16 }}>Category</Text>
      <FlatList
        data={categoryShowList}
        numColumns={4}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleInvalidateCategories} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePressCategory(item)}
            style={{
              width: '25%',
              padding: 8,
              alignItems: 'center',
            }}
          >
            <Box style={{ alignItems: 'center' }}>
              <Image
                source={item.image ? { uri: item.image } : IMAGES.category}
                alt={item.name}
                size="xs"
              />
              <Text fontWeight="bold" fontSize={12} alignSelf="center" textAlign="center">
                {item.name}
              </Text>
            </Box>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
