import { IMAGES } from '@appConfig/images';
import { ColorCode } from '@appConfig/theme';
import { OrderDetail } from '@queries';
import { formatMoney } from '@shared';
import { HStack, Image, Text } from 'native-base';
import { memo } from 'react';

type Props = {
  orderDetail: OrderDetail;
};

const OrderPreviewItem = ({ orderDetail }: Props) => {
  return (
    <HStack
      style={{
        width: '100%',
        paddingBottom: 8,
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
              color: ColorCode.PRIMARY,
              textAlign: 'right',
              width: 30,
            }}
          >
            {orderDetail.quantity} x
          </Text>
          <Text
            style={{
              width: 180,
              fontSize: 12,
            }}
            numberOfLines={2}
          >
            {orderDetail.product.name}
          </Text>
        </HStack>
        <Text
          style={{
            fontSize: 16,
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

export default memo(OrderPreviewItem);
