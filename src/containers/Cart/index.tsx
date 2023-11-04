import { Paths, RootStackParamList } from '@appConfig/paths';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService } from '@shared';
import { Button, Center, Text } from 'native-base';
import React from 'react';
type Props = NativeStackScreenProps<RootStackParamList, Paths.CART>;

const Cart = ({ navigation, route }: Props) => {
  return (
    <Center w={'100%'} h={'100%'}>
      <Text>Cart</Text>
      <Button
        onPress={async () => {
          await AuthService.clearToken();
        }}
      >
        log out
      </Button>
    </Center>
  );
};

export default Cart;