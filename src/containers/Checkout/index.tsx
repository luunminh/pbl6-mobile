import { Paths, RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, VStack, View } from 'native-base';
import GeneralInformation from './GeneralInformation';
import OderSummary from './OderSummary';
import CheckOutFooter from './CheckOutFooter';
import Voucher from './Voucher';
import ShippingOption from './ShippingOption';
import PaymentOption from './PaymentOption';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const Checkout = ({ navigation, route }: Props) => {
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
        <GeneralInformation navigation={navigation} route={route} />
        <ShippingOption navigation={navigation} route={route} />
        <Voucher navigation={navigation} route={route} />
        <OderSummary navigation={navigation} route={route} />
        <PaymentOption navigation={navigation} route={route} />
      </ScrollView>
      <CheckOutFooter navigation={navigation} route={route} />
    </View>
  );
};

export default Checkout;
