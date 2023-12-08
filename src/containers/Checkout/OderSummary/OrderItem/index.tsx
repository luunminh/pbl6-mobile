import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Cart } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatMoney } from '@shared';
import { HStack, Image, Text, VStack } from 'native-base';
import { memo } from 'react';

type Props = {
  cart: Cart;
};

const OrderItem = ({ cart }: Props) => {
  return (
    <HStack
      style={{
        width: '100%',
        paddingBottom: 8,
      }}
    >
      <Image
        source={cart.image ? { uri: cart.image } : IMAGES.noPhoto}
        alt={cart.product.name}
        size="xs"
        borderRadius={32}
      />
      <HStack
        style={{
          justifyContent: 'space-between',
          gap: 4,
          width: '88%',
        }}
      >
        <HStack style={{ gap: 4, justifyContent: 'flex-end' }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: ColorCode.PRIMARY,
              textAlign: 'right',
              width: 30,
            }}
          >
            {cart.quantity} x
          </Text>
          <Text
            style={{
              width: 180,
              fontSize: 12,
            }}
            numberOfLines={2}
          >
            {cart.product.name}
          </Text>
        </HStack>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: ColorCode.PRIMARY,
          }}
        >
          {formatMoney(cart.product.price)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default memo(OrderItem);
