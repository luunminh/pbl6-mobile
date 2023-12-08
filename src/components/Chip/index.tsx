import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { GetOrdersResponse } from '@queries/Order';
import { formatDate } from '@shared';
import { HStack, Icon, Text, VStack } from 'native-base';

type Props = {
  title: string;
  color: string;
  bgColor: string;
};

const Chip = ({ title, color, bgColor }: Props) => {
  return (
    <Text
      numberOfLines={2}
      style={{
        fontSize: 12,
        fontWeight: 'bold',
        color: color,
        backgroundColor: bgColor,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
      }}
    >
      {title}
    </Text>
  );
};

export default Chip;
