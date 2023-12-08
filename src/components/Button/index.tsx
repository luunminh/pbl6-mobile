import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Callback } from '@shared';
import { HStack, Icon, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = {
  label?: string;
  handlePress: Callback;
  disable?: boolean;
};

const Button = ({ label, handlePress, disable }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disable}
      style={{ backgroundColor: ColorCode.PRIMARY, padding: 12, borderRadius: 16 }}
    >
      <Text color="white" fontWeight="bold" textAlign="center">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
