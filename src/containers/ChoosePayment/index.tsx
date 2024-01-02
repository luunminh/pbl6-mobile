import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { PaymentMethod } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HStack, Text, View } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native';
import PaymentItem from './PaymentItem';
import { useEffect, useState } from 'react';
import { DeliveryInfoService, useToastify } from '@shared';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHOOSE_PAYMENT>;

const ChoosePayment = ({ navigation }: Props) => {
  const { showError } = useToastify();

  const [paymentMethod, setPaymentMethod] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      DeliveryInfoService.getPayment().then((value) => {
        if (value) {
          setPaymentMethod(value);
        } else {
          handlePress(PaymentMethod.COD);
          setPaymentMethod(PaymentMethod.COD);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const handlePress = async (payment: PaymentMethod) => {
    try {
      await DeliveryInfoService.setPayment(payment);
      navigation.goBack();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: ColorCode.WHITE,
        flex: 1,
        padding: 16,
        paddingTop: 32,
      }}
    >
      <FlatList
        data={Object.values(PaymentMethod)}
        renderItem={({ item }) => (
          <TouchableOpacity key={item} onPress={() => handlePress(item)}>
            <PaymentItem payment={item} check={paymentMethod === item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChoosePayment;
