import { Paths, RootStackParamList } from '@appConfig/paths';
import { GetOrdersResponse } from '@queries/Order';
import { useGetOrdersLazy } from '@queries/Order/useGetOrdersLazy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty, useToastify } from '@shared';
import { FlatList, Text, View } from 'native-base';
import { useEffect } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import OrderItem from './OrderItem';
import { ColorCode } from '@appConfig/theme';
import { LoadingContainer } from '../StartupContainers';
type Props = NativeStackScreenProps<RootStackParamList, Paths.CART>;

const Order = ({ navigation, route }: Props) => {
  const { showError, showSuccess } = useToastify();

  const { orderData, loading, setParams, fetchNextPage, handleInvalidateOrders } = useGetOrdersLazy(
    {
      onError(error) {
        showError(error?.message);
      },
    },
  );

  useEffect(() => {
    setParams({ order: 'createdAt:desc' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = (item: GetOrdersResponse) => {
    navigation.navigate(Paths.ORDER_DETAIL, { orderId: item.id });
  };

  const handleEndReach = () => {
    fetchNextPage();
  };

  if (loading) {
    return <LoadingContainer />;
  }

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
        <Text
          textAlign="center"
          fontWeight={'bold'}
          color={ColorCode.GREY_500}
          m={4}
          fontSize={'xl'}
        >
          You had not place any order yet
        </Text>
      )}
    </View>
  );
};

export default Order;
