import { ColorCode } from '@appConfig/theme';
import { Center, Spinner } from 'native-base';

type Props = {};

const LoadingContainer = ({}: Props) => {
  return (
    <Center bgColor={'white'} w={'100%'} h={'100%'}>
      <Spinner color={ColorCode.PRIMARY} size={100} />
    </Center>
  );
};

export default LoadingContainer;
