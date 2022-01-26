import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { shadowInput } from '../../styles/layoutStyle';

const CustomInput = props => {
  return (
    <View style={{ marginBottom: 15 }}>
      {props.title && <Text style={style.title}>{props.title}</Text>}
      <Card
        wrapperStyle={{
          margin: 0,
          paddingHorizontal: 10,
          backgroundColor: '#FFF',
          borderRadius: 30,
        }}
        containerStyle={style.container}>
        <TextInput maxLength={400} numberOfLines={5} {...props} />
      </Card>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 30,
    margin: 0,
    marginVertical: 15,
    padding: 0,
    ...shadowInput,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default CustomInput;
