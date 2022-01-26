import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { primary } from '../../styles/color';

const Select = props => {
  let { data } = props;
  const [selected, setSelected] = useState(data[0]);
  return (
    <View style={styles.container}>
      {props.title && <Text style={styles.texttitle}>{props.title}</Text>}
      <View style={styles.inputView}>
        <Picker
          style={{ flex: 1 }}
          dropdownIconColor={primary}
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}>
          {data.map((item, index) => {
            return (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  texttitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
