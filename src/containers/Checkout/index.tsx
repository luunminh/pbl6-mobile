import { Paths, RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { VoucherContext } from 'src/context';
import CheckOutFooter from './CheckOutFooter';
import GeneralInformation from './GeneralInformation';
import OderSummary from './OderSummary';
import PaymentOption from './PaymentOption';
import ShippingOption from './ShippingOption';
import Voucher from './VoucherOption';
import { getDatabase, ref, set } from 'firebase/database';
import { StoreService, useToastify } from '@shared';
import {
  ContactType,
  PaymentMethod,
  useCreateOrder,
  useDeleteCart,
  useGetCart,
  useGetProfile,
} from '@queries';
import { firebaseApp } from 'src/firebase';
import { getProductStore } from './helpers';
import { SHIPPING_FEE } from '@appConfig/constants';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const Checkout = ({ navigation, route }: Props) => {
  const [storeId, setStoreId] = useState<string>(null);
  const { showError, showSuccess } = useToastify();
  const [contact, setContact] = useState<ContactType>(null);
  const { selectedVoucher, setSelectedVoucherId } = useContext(VoucherContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreId().then((value) => setStoreId(value));
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
  const { createOrder, isLoading: isCreatingOrder } = useCreateOrder({
    onSuccess: () => {
      showSuccess('Create order successfully');
      deleteCart({});
      setSelectedVoucherId(null);
      navigation.navigate(Paths.ORDER_SUCCESS);
      handleSendRequestMsg();
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
      paymentMethod: PaymentMethod.COD,
    });
  };

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
        <Voucher navigation={navigation} voucherCode={selectedVoucher?.code} />
        <OderSummary navigation={navigation} route={route} />
        <PaymentOption paymentMethod={PaymentMethod.COD} />
      </ScrollView>
      <CheckOutFooter navigation={navigation} route={route} handleOrder={handlePlaceOrder} />
    </View>
  );
};

export default Checkout;
