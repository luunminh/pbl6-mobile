import { Paths, RootStackParamList } from '@appConfig/paths';
import { Button } from '@components';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetProfile } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatMoney, useToastify } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { VoucherContext } from 'src/context';
import { getDiscount } from '../OderSummary/helpers';

type Props = {};

const ShippingOption = ({}: Props) => {
  return (
    <VStack
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        marginHorizontal: 8,
      }}
    >
      <HStack style={{ justifyContent: 'space-between', marginBottom: 4 }}>
        <HStack style={{ gap: 4 }}>
          <Icon as={<MaterialIcons name="local-shipping" />} size={5} color="primary.400" />
          <Text fontWeight="bold">Shipping Option</Text>
        </HStack>
      </HStack>
      <Text paddingLeft={6}>Standard shipping (1 - 3 days)</Text>
    </VStack>
  );
};

export default ShippingOption;
