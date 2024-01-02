import { Paths, RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'native-base';
import { useContext, useEffect, useMemo, useState } from 'react';
import { VoucherContext } from 'src/context';
import CheckOutFooter from './CheckOutFooter';
import GeneralInformation from './GeneralInformation';
import OderSummary from './OderSummary';
import PaymentOption from './PaymentOption';
import ShippingOption from './ShippingOption';
import Voucher from './VoucherOption';
import { getDatabase, ref, set } from 'firebase/database';
import { DeliveryInfoService, StoreService, isEmpty, useToastify } from '@shared';
import {
  ContactType,
  CreateOrderResponse,
  PaymentMethod,
  useCreateOrder,
  useDeleteCart,
  useGetCart,
  useGetProfile,
} from '@queries';
import { firebaseApp } from 'src/firebase';
import { getProductStore } from './helpers';
import { SHIPPING_FEE } from '@appConfig/constants';
import { useGetOrdersLazy } from '@queries/Order/useGetOrdersLazy';
import * as WebBrowser from 'expo-web-browser';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const Checkout = ({ navigation, route }: Props) => {
  const [storeId, setStoreId] = useState<string>(null);
  const { showError, showSuccess } = useToastify();
  const [contact, setContact] = useState<ContactType>(null);
  const { selectedVoucher, setSelectedVoucherId } = useContext(VoucherContext);
  const [paymentMethod, setPaymentMethod] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
      DeliveryInfoService.getPayment().then((value) => setPaymentMethod(value));
      const address = await DeliveryInfoService.getAddress();
      const firstName = await DeliveryInfoService.getFirstName();
      const lastName = await DeliveryInfoService.getLastName();
      const phoneNumber = await DeliveryInfoService.getPhone();
      setContact({ address, firstName, lastName, phoneNumber });
    });

    return unsubscribe;
  }, [navigation]);

  const { cart, handleInvalidateCart, isLoading } = useGetCart({ storeId: storeId });

  const { deleteCart } = useDeleteCart({
    onSuccess: () => {
      handleInvalidateCart();
    },
    onError: (error) => {
      showError(error?.message);
    },
  });
  const { handleInvalidateOrders } = useGetOrdersLazy();
  const { createOrder, isLoading: isCreatingOrder } = useCreateOrder({
    onSuccess: async (data: CreateOrderResponse) => {
      deleteCart({});
      setSelectedVoucherId(null);
      handleInvalidateOrders();
      if (!isEmpty(data?.paymentUrl)) {
        console.log(data?.paymentUrl);
        let result = await WebBrowser.openBrowserAsync(data.paymentUrl);
        navigation.popToTop();
        handleInvalidateCart();
      } else {
        showSuccess('Create order successfully');
        navigation.navigate(Paths.ORDER_SUCCESS);
        handleInvalidateCart();
        handleSendRequestMsg();
      }
    },
    onError: (error) => showError(error?.message),
  });

  const handleSendRequestMsg = () => {
    const db = ref(getDatabase(firebaseApp), '/REQUEST_ORDER');
    const id = Date.now().toString();
    set(db, id).then(() => console.log('REQUEST_ORDER'));
  };

  const { profile } = useGetProfile({
    onErrorCallback: (error) => showError(error?.message),
  });

  useEffect(() => {
    if (profile) {
      setContact({
        address: profile.address,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phone,
      });
    }
  }, [profile]);

  const handlePlaceOrder = () => {
    createOrder({
      contact: contact,
      productStores: cart?.flatMap((itemInCart) => getProductStore(itemInCart)),
      voucherId: selectedVoucher?.id || null,
      shippingFee: SHIPPING_FEE,
      paymentMethod: paymentMethod ?? PaymentMethod.COD,
    });
  };

  const subTotal = useMemo(
    () =>
      cart
        ?.filter((product) => product.inOfStock)
        .reduce((total, curProduct) => total + curProduct.price, 0),
    [cart],
  );

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <GeneralInformation navigation={navigation} route={route} contact={contact} />
        <ShippingOption />
        <Voucher navigation={navigation} voucherCode={selectedVoucher?.code} subTotal={subTotal} />
        <OderSummary navigation={navigation} route={route} cart={cart} subTotal={subTotal} />
        <PaymentOption paymentMethod={paymentMethod ?? PaymentMethod.COD} navigation={navigation} />
      </ScrollView>
      <CheckOutFooter navigation={navigation} route={route} handleOrder={handlePlaceOrder} />
    </View>
  );
};

export default Checkout;
