import { Paths, RootStackParamList } from '@appConfig/paths';
import { ColorCode } from '@appConfig/theme';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService } from '@shared';
import { Button, Center, Icon, Input, Text, View } from 'native-base';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, Paths.SEARCH>;

const Search = ({ navigation, route }: Props) => {
  const handleSearch = (event) => {
    navigation.navigate(Paths.PRODUCT, { searchText: event.nativeEvent.text });
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: ColorCode.WHITE,
        flex: 1,
        padding: 16,
      }}
    >
      <Input
        InputLeftElement={
          <Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="primary.500" />
        }
        placeholder="What are you looking for..."
        onEndEditing={handleSearch}
      />
    </View>
  );
};

export default Search;
