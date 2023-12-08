import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToastify } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { VoucherContext } from 'src/context';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const Voucher = ({ navigation, route }: Props) => {
  const { selectedVoucher, setSelectedVoucherId } = useContext(VoucherContext);

  const handleChange = () => {};

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
        <TouchableOpacity onPress={handleChange} style={{ borderRadius: 16 }}>
          <Icon as={<MaterialIcons name="arrow-forward-ios" />} size={4} color="primary.400" />
        </TouchableOpacity>
      </HStack>
      <Text paddingLeft={6}> {selectedVoucher?.code || 'No selected voucher'}</Text>
    </VStack>
  );
};

export default Voucher;
