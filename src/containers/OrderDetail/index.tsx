import { Paths, RootStackParamList } from '@appConfig/paths';
import { Button } from '@components';
import { OrderStatus, useCancelOrder, useGetOrderDetail } from '@queries';
import { useGetOrdersLazy } from '@queries/Order/useGetOrdersLazy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToastify } from '@shared';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView, Stack } from 'native-base';
import { Alert } from 'react-native';
import PaymentOption from '../Checkout/PaymentOption';
import ShippingOption from '../Checkout/ShippingOption';
import Voucher from '../Checkout/VoucherOption';
import { LoadingContainer } from '../StartupContainers';
import OderSummary from './OderSummary';
import OrderInfo from './OrderInfo';

type Props = NativeStackScreenProps<RootStackParamList, Paths.ORDER_DETAIL>;

const OrderDetail = ({ navigation, route }: Props) => {
  const { showSuccess, showError } = useToastify();
  const { orderId } = route.params;
  const { handleInvalidateOrders } = useGetOrdersLazy();
  const { orderDetail, isLoading, handleInvalidateOrderDetail } = useGetOrderDetail({
    id: orderId,
  });

  const { cancelOrder, isLoading: isCancellingOrder } = useCancelOrder({
    onSuccess() {
      showSuccess('Your order has been cancelled!');
      handleInvalidateOrders();
      handleInvalidateOrderDetail();
    },
    onError(error) {
      showError(error.message);
    },
  });

  if (isLoading) return <LoadingContainer />;

  const handleCancelOrder = () => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel your order?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => cancelOrder({ orderId: orderDetail.id, requestType: 'cancel' }),
        style: 'default',
      },
    ]);
  };

  const handlePay = async () => {
    let result = await WebBrowser.openBrowserAsync(orderDetail.paymentUrl);
    handleInvalidateOrderDetail();
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
      }}
    >
      <OrderInfo orderDetail={orderDetail} />
      <ShippingOption />
      <PaymentOption viewOnly paymentMethod={orderDetail.paymentMethod} />
      <Voucher<Paths.ORDER_DETAIL>
        navigation={navigation}
        viewOnly
        voucherCode={orderDetail?.voucher?.code}
      />
      <OderSummary orderDetail={orderDetail} />
      {orderDetail?.orderStatusId === +OrderStatus.PENDING_CONFIRM && (
        <Stack padding={2}>
          <Button label="Cancel Order" handlePress={handleCancelOrder} />
        </Stack>
      )}
      {orderDetail?.orderStatusId === +OrderStatus.PENDING_PAYMENT && (
        <Stack padding={2}>
          <Button label="Pay now" handlePress={handlePay} />
        </Stack>
      )}
    </ScrollView>
  );
};

export default OrderDetail;
