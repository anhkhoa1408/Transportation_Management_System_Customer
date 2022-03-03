import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles';

function PrimaryButton(props) {
  return (
    <Button
      {...props}
      containerStyle={{
        ...props.containerStyle,
        borderRadius: 8,
        marginVertical: 15,
      }}
      buttonStyle={{
        ...props.buttonStyle,
        padding: 14,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : COLORS.primary,
      }}
      titleStyle={{
        fontSize: 16,
        textTransform: 'uppercase',
        color: props.neutralColor ? props.neutralColor : COLORS.white,
      }}
      TouchableComponent={TouchableOpacity}
      activeOpacity={0.7}
    />
  );
}

export default PrimaryButton;
