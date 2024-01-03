import { ColorCode } from '@appConfig/theme';
import { Feather } from '@expo/vector-icons';
import { GetOrdersResponse } from '@queries/Order';
import { formatDate, formatMoney } from '@shared';
import { Divider, HStack, Text, VStack } from 'native-base';
import PreviewProduct from '../PreviewProduct';
import { renderOrderCardStatus } from './helpers';
import { LoadingContainer } from 'src/containers/StartupContainers';

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
        <HStack style={{ alignItems: 'center' }}>
          <HStack
            style={{
              backgroundColor: ColorCode.PRIMARY_200,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 16,
            }}
          >
            <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>
              Order
            </Text>
            <Text numberOfLines={2} style={{ fontWeight: 'bold', color: ColorCode.PRIMARY }}>
              {` #${formatDate(order?.createdAt, 'DDMMYYTHHmmss')}`}
            </Text>
          </HStack>
        </HStack>
        {renderOrderCardStatus(order?.orderStatusId)}
      </HStack>
      <VStack
        style={{
          paddingHorizontal: 16,
        }}
      >
        {order?.orderDetails
          ?.slice(0, 2)
          .map((orderDetail) => <PreviewProduct key={orderDetail.id} orderDetail={orderDetail} />)}
        <Text fontSize={12} paddingLeft={87} paddingTop={1}>
          View more ...
        </Text>
        <Divider my={2} />
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text fontSize={12}>
            {order?.orderDetails?.length} {`${order?.orderDetails?.length > 1 ? 'items' : 'item'}`}
          </Text>
          <HStack style={{ gap: 4 }}>
            <Text>Total:</Text>
            {order?.total && (
              <Text style={{ color: ColorCode.PRIMARY, fontWeight: 'bold' }}>
                {formatMoney(order.total)}
              </Text>
            )}
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default OrderItem;
