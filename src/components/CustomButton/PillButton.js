import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

function PillButton(props) {
  return (
    <Button
      {...props}
      containerStyle={{
        ...props.containerStyle,
        borderRadius: 35,
        marginVertical: 15,
      }}
      buttonStyle={{
        ...props.buttonStyle,
        padding: 14,
      }}
      TouchableComponent={TouchableOpacity}
      activeOpacity={0.7}
    />
  );
}

export default PillButton;
