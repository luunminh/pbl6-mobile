import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { StoreResponse, VoucherResponse, VoucherType } from '@queries';
import { formatMoney, getDate } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';

type Props = {
  voucher: VoucherResponse;
  disable?: boolean;
};

const getVoucherDescription = (voucher: VoucherResponse) => {
  return `Discount ${
    voucher.type === VoucherType.FIXED
      ? formatMoney(voucher.discountValue)
      : `${voucher.discountValue}%`
  } for orders with a minimum total value of ${formatMoney(voucher.minValueOrder)}`;
};

const VoucherItem = ({ voucher, disable }: Props) => {
  return (
    <HStack
      style={{
        backgroundColor: ColorCode.WHITE,
        borderRadius: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: ColorCode.GREY_200,
        opacity: disable ? 0.6 : 1,
      }}
    >
      <VStack
        style={{
          backgroundColor: ColorCode.PRIMARY,
          justifyContent: 'center',
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          paddingHorizontal: 16,
        }}
      >
        <Icon as={<MaterialIcons name="confirmation-number" />} size={5} ml="2" color={'white'} />
        <Text style={{ fontWeight: 'bold', color: ColorCode.WHITE, fontSize: 16 }}>MALT</Text>
      </VStack>
      <VStack
        style={{
          width: '90%',
          borderLeftWidth: 2,
          borderLeftColor: ColorCode.PRIMARY,
          borderStyle: 'dotted',
          paddingLeft: 12,
          paddingVertical: 4,
        }}
      >
        <Text
          numberOfLines={2}
          style={{ fontWeight: 'bold', color: ColorCode.PRIMARY, fontSize: 16 }}
        >
          {voucher.code}
        </Text>
        <Text fontSize={10} paddingBottom={2}>
          Date: {getDate(voucher.startDate)} - {getDate(voucher.endDate)}
        </Text>
        <Text>{getVoucherDescription(voucher)}</Text>
      </VStack>
    </HStack>
  );
};

export default VoucherItem;
