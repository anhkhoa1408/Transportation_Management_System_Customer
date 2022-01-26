import React, { useState, useRef, useCallback } from 'react';
import { Switch } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { success } from '../../styles/color';

const ButtonSwitch = props => {
  return (
    <View
      style={
        props.checked
          ? [styles.switchContainer, styles.switchOn]
          : [styles.switchContainer, styles.switchOff]
      }>
      <Switch
        onValueChange={props.onValueChange}
        thumbColor="#FFF"
        trackColor={{ false: '#CCC', true: success }}
        value={props.checked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  switchOn: {
    backgroundColor: success,
  },
  switchOff: {
    backgroundColor: '#CCC',
  },
});

export default ButtonSwitch;
