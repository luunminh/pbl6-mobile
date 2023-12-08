import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { StoreResponse, useGetCart } from '@queries';
import { useGetAllStoreLazy } from '@queries/Store/useGetAllStoreLazy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, isEmpty, useToastify } from '@shared';
import { FlatList, HStack, Icon, Input, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import StoreItem from './StoreItem';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHOOSE_STORE>;

const ChooseStore = ({ navigation, route }: Props) => {
  const [storeId, setStoreId] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { showError } = useToastify();

  const { storeData, setParams, fetchNextPage, setInputSearch, loading, handleInvalidateStores } =
    useGetAllStoreLazy({
      onError: (error) => showError(error.message),
    });

  const { handleInvalidateCart } = useGetCart({ storeId: storeId });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndReach = () => {
    fetchNextPage();
  };

  const handleSearch = (event) => {
    setInputSearch(event.nativeEvent.text);
  };

  const handlePress = async (store: StoreResponse) => {
    try {
      await StoreService.setStoreName(store.address);
      await StoreService.setStoreId(store.id);
      handleInvalidateCart();
      navigation.goBack();
    } catch (error) {
      showError(error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: ColorCode.WHITE,
        flex: 1,
        padding: 16,
        paddingTop: 32,
      }}
    >
      <HStack style={{ width: '100%', alignItems: 'center', gap: 8 }}>
        <TouchableOpacity onPress={handleBack}>
          <Icon as={<MaterialIcons name="arrow-back" />} size={5} color="primary.400" />
        </TouchableOpacity>
        <Input
          InputLeftElement={
            <Icon as={<MaterialIcons name="location-pin" />} size={5} ml="2" color="primary.500" />
          }
          placeholder="Input the store address to find..."
          onChange={handleSearch}
          isFullWidth
          width="90%"
        />
      </HStack>
      {!isEmpty(storeData) ? (
        <FlatList
          data={storeData}
          onEndReached={handleEndReach}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleInvalidateStores} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
              <StoreItem store={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text textAlign="center">No Store Found</Text>
      )}
    </View>
  );
};

export default ChooseStore;
