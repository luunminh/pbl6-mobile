import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { StoreResponse } from '@queries';
import { HStack, Icon, Text, VStack } from 'native-base';

type Props = {
  store: StoreResponse;
};

const StoreItem = ({ store }: Props) => {
  return (
    <HStack
      style={{
        backgroundColor: ColorCode.WHITE,
        borderRadius: 16,
        paddingVertical: 16,
        gap: 8,
      }}
    >
      <Icon as={<MaterialIcons name="store" />} size={5} ml="2" color="primary.500" />
      <VStack
        style={{
          width: '90%',
        }}
      >
        <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>
          {store.address}
        </Text>
        <Text numberOfLines={2} style={{ fontSize: 12 }}>
          {store.hotline}
        </Text>
      </VStack>
    </HStack>
  );
};

export default StoreItem;
