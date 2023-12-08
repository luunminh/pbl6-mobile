import { Paths, RootStackParamList } from '@appConfig/paths';
import { GetOrdersResponse, useGetOrders } from '@queries/Order';
import { useGetOrdersLazy } from '@queries/Order/useGetOrdersLazy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty, useToastify } from '@shared';
import { FlatList, View, Text } from 'native-base';
import { useEffect } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import OrderItem from './OrderItem';
type Props = NativeStackScreenProps<RootStackParamList, Paths.CART>;

const Order = ({ navigation, route }: Props) => {
  const { showError, showSuccess } = useToastify();

  const { orderData, loading, setParams, fetchNextPage, setInputSearch, handleInvalidateOrders } =
    useGetOrdersLazy({
      onError(error) {
        showError(error?.message);
      },
    });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = (item: GetOrdersResponse) => {};

  const handleEndReach = () => {
    fetchNextPage();
  };

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      {!isEmpty(orderData) ? (
        <FlatList
          data={orderData}
          onEndReached={handleEndReach}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleInvalidateOrders} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePress(item)}
              style={{ paddingHorizontal: 8, paddingVertical: 4 }}
            >
              <OrderItem order={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text textAlign="center">You had not place any order yet</Text>
      )}
    </View>
  );
};

export default Order;
