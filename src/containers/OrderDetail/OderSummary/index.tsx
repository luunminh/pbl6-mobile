import { SHIPPING_FEE } from '@appConfig/constants';
import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { GetOrderDetailResponse } from '@queries';
import { formatMoney } from '@shared';
import { Divider, HStack, Icon, Text, VStack } from 'native-base';
import OrderPreviewItem from './OrderPreviewItem';

type Props = {
  orderDetail: GetOrderDetailResponse;
};

const OderSummary = ({ orderDetail }: Props) => {
  return (
    <VStack
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        marginHorizontal: 8,
        gap: 8,
      }}
    >
      <HStack style={{ justifyContent: 'space-between', marginBottom: 4 }}>
        <HStack style={{ gap: 4, alignItems: 'center' }}>
          <Icon as={<MaterialIcons name="list-alt" />} size={5} color="primary.400" />
          <Text fontWeight="bold">Oder Summary</Text>
        </HStack>
      </HStack>
      <VStack style={{ gap: 4 }}>
        {orderDetail.orderDetails?.map((item) => (
          <OrderPreviewItem key={item.id} orderDetail={item} />
        ))}
      </VStack>
      <Divider />
      <VStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Sub Total:</Text>
          <Text textAlign="right">{formatMoney(orderDetail.subTotal || 0)}</Text>
        </HStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Shipping Fee:</Text>
          <Text textAlign="right">{formatMoney(SHIPPING_FEE)}</Text>
        </HStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Discount:</Text>
          <Text textAlign="right">{formatMoney(orderDetail.discountValue)}</Text>
        </HStack>
        <HStack style={{ justifyContent: 'space-between' }}>
          <Text>Total:</Text>
          <Text textAlign="right" color={ColorCode.PRIMARY} fontWeight="bold">
            {formatMoney(orderDetail.total)}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default OderSummary;
