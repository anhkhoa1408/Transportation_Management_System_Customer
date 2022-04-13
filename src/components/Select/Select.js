import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { primary } from '../../styles/color';
import TextField from '../TextField';

const Select = props => {
  const { data, selected, setSelected, disabled = false } = props;
  const [selectedItem, setSelectedItem] = useState(selected);

  React.useEffect(() => {
    // console.log(data);
  });

  return (
    <View style={styles.container}>
      {props.title && <Text style={styles.texttitle}>{props.title}</Text>}
      <View style={styles.inputView}>
        <Picker
          enabled={!disabled}
          mode="dropdown"
          style={{ flex: 1, fontSize: 17, color: '#000' }}
          dropdownIconColor={primary}
          selectedValue={selectedItem}
          onValueChange={(itemValue, itemIndex) => {
            setSelected(itemValue);
            setSelectedItem(itemValue);
          }}>
          {data.map((item, index) => {
            const name = item?.name ? item.name : item;
            const value = item?.value ? item.value : item;
            const label = item?.label ? item.label : name;
            return <Picker.Item key={label} label={label} value={value} />;
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
    fontSize: 15,
    color: '#000000',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#F3F3FA',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
