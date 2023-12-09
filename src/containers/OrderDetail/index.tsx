import { Paths, RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, VStack, View } from 'native-base';
import ShippingOption from '../Checkout/ShippingOption';
import Voucher from '../Checkout/VoucherOption';
import { useGetOrderDetail } from '@queries';
import OrderInfo from './OrderInfo';
import { LoadingContainer } from '../StartupContainers';
import PaymentOption from '../Checkout/PaymentOption';
import OderSummary from './OderSummary';

type Props = NativeStackScreenProps<RootStackParamList, Paths.ORDER_DETAIL>;

const OrderDetail = ({ navigation, route }: Props) => {
  const { orderId } = route.params;
  const { orderDetail, isLoading, handleInvalidateOrderDetail } = useGetOrderDetail({
    id: orderId,
  });

  if (isLoading) return <LoadingContainer />;

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
    </ScrollView>
  );
};

export default OrderDetail;
