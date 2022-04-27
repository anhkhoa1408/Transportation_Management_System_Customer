import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS } from './../../styles';

const CustomInput = props => {
  const ref = useRef(null);
  const [focus, setFocus] = useState(null);

  const handleFocus = () => {
    setFocus({
      borderColor: COLORS.primary,
      borderWidth: 2,
    });
  };

  const handleBlur = () => {
    setFocus({
      borderWidth: 0,
    });
    props.onBlur && props.onBlur();
  };

  return (
    <View style={{ marginTop: 10, marginBottom: 5 }}>
      {props.title && <Text style={style.title}>{props.title}</Text>}
      <TextInput
        style={[style.container, focus]}
        maxLength={400}
        numberOfLines={5}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    margin: 0,
    marginVertical: 15,
    borderWidth: 0,
    backgroundColor: '#F3F3FA',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 100,
    fontSize: 15,
    color: '#000',
  },
  title: {
    fontSize: 15,
    color: '#000000',
  },
});

export default CustomInput;
