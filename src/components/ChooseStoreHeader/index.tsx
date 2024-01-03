import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StoreService } from '@shared';
import { HStack, Icon, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

type Props<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  color?: string;
};

const ChooseStoreHeader = <T extends keyof RootStackParamList>({
  navigation,
  color = ColorCode.PRIMARY,
}: Props<T>) => {
  const [storeName, setStoreName] = useState<string>(null);

  const handlePress = () => {
    navigation.navigate(Paths.CHOOSE_STORE);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StoreService.getStoreName().then((value) => setStoreName(value));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 16,
        overflow: 'hidden',
      }}
    >
      <TouchableOpacity
        onPress={() => handlePress()}
        style={{
          height: 'auto',
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: color }}>Store:</Text>
        <HStack style={{ gap: 4 }}>
          <Icon as={<MaterialIcons name="location-pin" />} size={4} mt={1} color={color} />
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: color }}>
            {storeName ? storeName : 'Click to select a store'}
          </Text>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseStoreHeader;
