import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { VoucherResponse, useGetAllVouchersLazy, useGetProfile } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty, useToastify } from '@shared';
import { FlatList, HStack, Icon, Input, Text, View } from 'native-base';
import { useContext, useEffect } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import VoucherItem from './VoucherItem';
import { VoucherContext } from 'src/context';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHOOSE_VOUCHER>;

const ChooseVoucher = ({ navigation, route }: Props) => {
  const { subTotal } = route.params;
  const { selectedVoucher, setSelectedVoucherId } = useContext(VoucherContext);
  const { showError } = useToastify();
  const {
    voucherData,
    setParams,
    handleInvalidateVouchers,
    fetchNextPage,
    setInputSearch,
    loading,
  } = useGetAllVouchersLazy();
  const { profile } = useGetProfile({ onError: (error) => showError(error?.message) });

  useEffect(() => {
    setParams({ valid: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndReach = () => {
    fetchNextPage();
  };

  const handleSearch = (event) => {
    setInputSearch(event.nativeEvent.text);
  };

  const handlePress = (voucher: VoucherResponse) => {
    setSelectedVoucherId(voucher.id);
    navigation.goBack();
    handleInvalidateVouchers();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const validVoucher = voucherData?.filter(
    (voucher) => !voucher.metadata.users.includes(profile?.id),
  );

  return (
    <View
      style={{
        backgroundColor: ColorCode.WHITE,
        flex: 1,
        padding: 16,
        paddingTop: 32,
      }}
    >
      <HStack style={{ width: '100%', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <TouchableOpacity onPress={handleBack}>
          <Icon as={<MaterialIcons name="arrow-back" />} size={5} color="primary.400" />
        </TouchableOpacity>
        <Input
          InputLeftElement={
            <Feather
              name="search"
              size={18}
              color={ColorCode.GREY_200}
              style={{ paddingLeft: 8 }}
            />
          }
          placeholder="Input the voucher code to find..."
          onChange={handleSearch}
          isFullWidth
          width="90%"
        />
      </HStack>
      {!isEmpty(validVoucher) ? (
        <FlatList
          data={validVoucher}
          onEndReached={handleEndReach}
          keyExtractor={(item) => item.code}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleInvalidateVouchers} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePress(item)}
              disabled={subTotal < item.minValueOrder}
            >
              <VoucherItem voucher={item} disable={subTotal < item.minValueOrder} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text textAlign="center">No Voucher available</Text>
      )}
    </View>
  );
};

export default ChooseVoucher;
