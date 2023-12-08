import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Cart, OrderDetail } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatMoney } from '@shared';
import { HStack, Image, Text, VStack } from 'native-base';
import { memo } from 'react';

type Props = {
  orderDetail: OrderDetail;
};

const PreviewProduct = ({ orderDetail }: Props) => {
  return (
    <HStack
      style={{
        width: '100%',
        gap: 4,
      }}
    >
      <Image
        source={orderDetail.product.image ? { uri: orderDetail.product.image } : IMAGES.noPhoto}
        alt={orderDetail.product.name}
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
              textAlign: 'right',
              width: 30,
            }}
          >
            {orderDetail.quantity} x
          </Text>
          <Text
            style={{
              width: 160,
              fontSize: 12,
            }}
            numberOfLines={2}
          >
            {orderDetail.product.name}
          </Text>
        </HStack>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: ColorCode.PRIMARY,
          }}
        >
          {formatMoney(orderDetail.product.price)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default memo(PreviewProduct);
