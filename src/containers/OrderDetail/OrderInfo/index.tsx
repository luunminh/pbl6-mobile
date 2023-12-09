import { ColorCode } from '@appConfig/theme';
import { GetOrderDetailResponse } from '@queries';
import { formatDate } from '@shared';
import { HStack, Text, VStack } from 'native-base';
import { renderOrderCardStatus } from 'src/containers/Order/OrderItem/helpers';

type Props = {
  orderDetail: GetOrderDetailResponse;
};

const OrderInfo = ({ orderDetail }: Props) => {
  return (
    <VStack
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        marginHorizontal: 8,
        gap: 4,
      }}
    >
      <VStack>
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
                {` #${formatDate(orderDetail?.createdAt, 'DDMMYYTHHmmss')}`}
              </Text>
            </HStack>
          </HStack>
          {renderOrderCardStatus(orderDetail?.orderStatusId)}
        </HStack>
        <Text paddingLeft={2} fontSize={12}>
          {formatDate(orderDetail?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
        </Text>
      </VStack>
      <VStack>
        <Text fontSize={14} paddingLeft={2}>
          {orderDetail?.metadata.Information.firstName} {orderDetail?.metadata.Information.lastName}{' '}
          - {orderDetail?.metadata.Information.phoneNumber}
        </Text>
        <Text fontSize={14} paddingLeft={2}>
          {orderDetail?.metadata.Information.address}
        </Text>
      </VStack>
    </VStack>
  );
};

export default OrderInfo;
