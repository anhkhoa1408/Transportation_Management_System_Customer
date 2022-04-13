import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { header } from '../../styles/layoutStyle';
import { headerFont } from '../../styles/fontStyle';

const Header = ({ leftElement, headerText, rightElement }) => {
  return (
    <View style={{ ...header }}>
      <View style={{ minWidth: 30 }}>{leftElement}</View>
      <Text h4 h4Style={{ ...headerFont }}>
        {headerText}
      </Text>
      <View style={{ minWidth: 30 }}>{rightElement}</View>
    </View>
  );
};

export default Header;
