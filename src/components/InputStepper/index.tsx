import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Callback } from '@shared';
import { HStack, Icon, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = {
  value: number;
  handleIncrease: Callback;
  handleDecrease: Callback;
  disableIncrease?: boolean;
};

const InputStepper = ({ handleIncrease, handleDecrease, value, disableIncrease }: Props) => {
  return (
    <HStack style={{ gap: 4 }} py={2}>
      <TouchableOpacity style={{ justifyContent: 'center' }} onPress={handleDecrease}>
        <Icon
          as={<MaterialIcons name="remove" />}
          size={6}
          color="primary.400"
          style={{ borderWidth: 1, borderColor: ColorCode.PRIMARY, borderRadius: 32 }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value}</Text>
      <TouchableOpacity
        style={{ justifyContent: 'center' }}
        disabled={disableIncrease}
        onPress={(e) => {
          e.stopPropagation();
          !disableIncrease && handleIncrease;
        }}
      >
        <Icon
          as={<MaterialIcons name="add" />}
          size={6}
          color="white"
          style={{
            backgroundColor: disableIncrease ? ColorCode.GREY_200 : ColorCode.PRIMARY,
            borderRadius: 32,
          }}
        />
      </TouchableOpacity>
    </HStack>
  );
};

export default InputStepper;
