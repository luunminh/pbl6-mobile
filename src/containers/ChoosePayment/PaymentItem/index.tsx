import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { PaymentMethod, PaymentMethodTitle } from '@queries';
import { Checkbox, HStack, Icon, Text } from 'native-base';

type Props = {
  payment: PaymentMethod;
  check?: boolean;
};

const PaymentItem = ({ payment, check }: Props) => {
  const handleChoosePayment = () => {};

  return (
    <HStack
      style={{
        backgroundColor: ColorCode.WHITE,
        borderRadius: 16,
        marginBottom: 32,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <HStack style={{ alignItems: 'center', gap: 6 }}>
        <Icon
          as={<MaterialIcons name={payment === PaymentMethod.COD ? 'payments' : 'payment'} />}
          size={10}
          ml="2"
          color={'primary.400'}
        />
        <Text numberOfLines={2} style={{ fontSize: 16 }}>
          {PaymentMethodTitle[payment]}
        </Text>
      </HStack>
      <Checkbox.Group onChange={handleChoosePayment} value={check ? [payment] : []}>
        <Checkbox value={payment} color={'primary.400'} />
      </Checkbox.Group>
    </HStack>
  );
};

export default PaymentItem;
