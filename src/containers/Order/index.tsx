import { Paths, RootStackParamList } from '@appConfig/paths';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService } from '@shared';
import { Button, Center, Text } from 'native-base';
import React from 'react';
type Props = NativeStackScreenProps<RootStackParamList, Paths.ORDER>;

const Order = ({ navigation, route }: Props) => {
  return (
    <Center w={'100%'} h={'100%'}>
      <Text>Order</Text>
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

export default Order;
