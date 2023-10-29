import { IMAGES } from '@appConfig/images';
import { Center, Image, Text, VStack } from 'native-base';

const SplashScreen = () => {
  return (
    <Center bgColor={'white'} height={'100%'} width={'100%'}>
      <VStack space={3} direction="row" alignItems={'center'}>
        <Image size="lg" source={IMAGES.logo} alt="" />
        <Text fontSize={35} color={'primary.600'} fontWeight={600}>
          MALT
        </Text>
      </VStack>
      <Text mt={1} fontWeight={600} color={'gray.800'} fontSize={14}>
        A place for your convenience
      </Text>
    </Center>
  );
};

export default SplashScreen;
