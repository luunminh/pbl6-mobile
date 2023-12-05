import { IMAGES } from '@appConfig/images';
import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { CategoryListResponse } from '@queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Card, Image, Text, View } from 'native-base';

type Props = {
  category: CategoryListResponse;
};

const CategoryItem = ({ category }: Props) => {
  return (
    <Box>
      <Image
        source={category.image ? { uri: category.image } : IMAGES.noPhoto}
        alt={category.name}
        size="xl"
        borderRadius={32}
        style={{ backgroundColor: ColorCode.PRIMARY_100 }}
      />
      <Text style={{ fontWeight: 'bold' }}>{category.name}</Text>
    </Box>
  );
};

export default CategoryItem;
