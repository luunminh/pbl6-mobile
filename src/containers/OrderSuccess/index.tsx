import { Paths, RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, HStack, Stack, Text, VStack } from 'native-base';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { ColorCode } from '@appConfig/theme';

type Props = NativeStackScreenProps<RootStackParamList, Paths.ORDER_SUCCESS>;

const OrderSuccess = ({ navigation, route }: Props) => {
  console.log('navigation', navigation);
  return (
    <VStack
      w={'100%'}
      h={'100%'}
      bgColor={'white'}
      px={4}
      pt={10}
      justifyContent={'center'}
      style={{
        gap: 16,
      }}
    >
      <VStack style={{ justifyContent: 'center', alignItems: 'center' }}>
        <HStack style={{ justifyContent: 'center', paddingBottom: 16 }}>
          <VStack
            style={{
              backgroundColor: ColorCode.SUCCESS_BG,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              borderRadius: 1000,
              opacity: 0.5,
            }}
          >
            <VStack
              style={{
                backgroundColor: ColorCode.SUCCESS_BG,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 1000,
                opacity: 1,
              }}
            >
              <Feather name="check" size={60} color={ColorCode.SUCCESS} />
            </VStack>
          </VStack>
        </HStack>
        <Text fontSize={20} color={ColorCode.SUCCESS} fontWeight="bold">
          Thank you for your order
        </Text>
        <Text textAlign="center">
          We have received your order request. We will process your request soon!
        </Text>
      </VStack>
      <VStack space={4}>
        <Button bgColor={'primary.50'} onPress={() => navigation.popToTop()}>
          Back to Cart
        </Button>
      </VStack>
    </VStack>
  );
};

export default OrderSuccess;
