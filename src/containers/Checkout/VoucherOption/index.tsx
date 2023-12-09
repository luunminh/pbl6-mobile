import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  viewOnly?: boolean;
  voucherCode?: string;
  subTotal?: number;
};

const VoucherOption = <T extends keyof RootStackParamList>({
  navigation,
  viewOnly,
  voucherCode,
  subTotal,
}: Props<T>) => {
  const handleChange = () => {
    navigation.navigate(Paths.CHOOSE_VOUCHER, { subTotal: subTotal });
  };

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
      <HStack
        style={{
          justifyContent: 'space-between',
          marginBottom: 4,
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <HStack style={{ gap: 4 }}>
          <Feather name="divide" size={18} color={ColorCode.PRIMARY} />
          <Text fontWeight="bold">Voucher</Text>
        </HStack>
        {!viewOnly && (
          <TouchableOpacity onPress={handleChange} style={{ borderRadius: 16 }}>
            <Icon as={<MaterialIcons name="arrow-forward-ios" />} size={4} color="primary.400" />
          </TouchableOpacity>
        )}
      </HStack>
      <Text paddingLeft={6}> {voucherCode || 'No selected voucher'}</Text>
    </VStack>
  );
};

export default VoucherOption;
