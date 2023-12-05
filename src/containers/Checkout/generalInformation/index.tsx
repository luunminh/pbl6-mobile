import { Paths, RootStackParamList } from '@appConfig/paths';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService } from '@shared';
import { Button, Center, Text } from 'native-base';

type Props = NativeStackScreenProps<RootStackParamList, Paths.CHECKOUT>;

const generalInformation = ({ navigation, route }: Props) => {
  return (
    <Center w={'100%'} h={'100%'}>
      <Text>generalInformation</Text>
      <Button
        onPress={async () => {
          await AuthService.clearToken();
        }}
      >
        log out
      </Button>
    </Center>
  );
};

export default generalInformation;
