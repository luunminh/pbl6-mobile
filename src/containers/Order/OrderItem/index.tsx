import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { GetOrdersResponse } from '@queries/Order';
import { formatDate, formatMoney } from '@shared';
import { Divider, HStack, Icon, Text, VStack } from 'native-base';
import { renderOrderCardStatus } from './helpers';
import PreviewProduct from '../PreviewProduct';

type Props = {
  order: GetOrdersResponse;
};

const OrderItem = ({ order }: Props) => {
  return (
    <VStack
      style={{
        backgroundColor: ColorCode.WHITE,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 8,
      }}
    >
      <HStack style={{ justifyContent: 'space-between' }}>
        <HStack
          style={{
            backgroundColor: ColorCode.PRIMARY_200,
            width: '53%',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 16,
          }}
        >
          <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>
            Order
          </Text>
          <Text numberOfLines={2} style={{ fontWeight: 'bold', color: ColorCode.PRIMARY }}>
            {` #${formatDate(order.createdAt, 'DDMMYYTHHmmss')}`}
          </Text>
        </HStack>
        {renderOrderCardStatus(order.orderStatusId)}
      </HStack>
      <VStack
        style={{
          paddingHorizontal: 16,
        }}
      >
        {order.orderDetails.slice(0, 2).map((orderDetail) => (
          <PreviewProduct orderDetail={orderDetail} />
        ))}
        <Text fontSize={12} paddingLeft={87} paddingTop={1}>
          View more ...
        </Text>
        <Divider />
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text fontSize={12}>{order.orderDetails.length} items</Text>
          <HStack style={{ gap: 4 }}>
            <Text>Total:</Text>
            <Text style={{ color: ColorCode.PRIMARY, fontWeight: 'bold' }}>
              {formatMoney(order.total)}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default OrderItem;
