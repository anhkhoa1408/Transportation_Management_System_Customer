import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { COLORS } from '../../styles';

const CustomSearch = props => {
  return (
    <SearchBar
      cancelButtonTitle="Huỷ"
      placeholder="Nhập"
      value=""
      platform="ios"
      inputContainerStyle={{ backgroundColor: COLORS.gray }}
      {...props}
    />
  );
};

export default CustomSearch;
