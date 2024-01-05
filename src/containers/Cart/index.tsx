import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ChooseStoreHeader } from '@components';
import { useGetCart } from '@queries/Cart';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StoreService, isEmpty } from '@shared';
import { FlatList, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { ImageBackground, RefreshControl } from 'react-native';
import CartFooter from './CartFooter';
import CartItem from './CartItem';
import { ColorCode } from '@appConfig/theme';
import { LoadingContainer } from '../StartupContainers';
type Props = NativeStackScreenProps<RootStackParamList, Paths.CART>;

const Cart = ({ navigation, route }: Props) => {
  const [storeId, setStoreId] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
    });

    return unsubscribe;
  }, [navigation]);

  const { cart, handleInvalidateCart, isLoading } = useGetCart({ storeId: storeId });

  if (isLoading) {
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
      <ImageBackground source={IMAGES.primaryBg} style={{ width: '100%' }}>
        <ChooseStoreHeader<Paths.CART> navigation={navigation} color="white" />
      </ImageBackground>
      {!isEmpty(cart) ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleInvalidateCart} />
          }
          renderItem={({ item }) => <CartItem cart={item} navigation={navigation} route={route} />}
        />
      ) : (
        <Text
          textAlign="center"
          fontWeight={'bold'}
          color={ColorCode.GREY_500}
          m={4}
          fontSize={'xl'}
        >
          No Product in Cart yet
        </Text>
      )}
      <CartFooter navigation={navigation} route={route} />
    </View>
  );
};

export default Cart;
