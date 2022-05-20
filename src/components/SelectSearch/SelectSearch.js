import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList, SafeAreaView, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import SelectSearchInput from './SelectSearchInput';

const SelectSearch = ({
  data,
  onChoose,
  title,
  disabled,
  value,
  onChangeText,
  ...props
}) => {
  const { t } = useTranslation('common');
  const [selected, setSelected] = useState(true);

  function renderSelectableItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.selectItem}
        onPress={e => {
          e.stopPropagation();
          onChoose(item);
          setSelected(true);
        }}>
        <Text style={styles.fsize}>{item}</Text>
      </TouchableOpacity>
    );
  }

  const filterData =
    !selected && value && data
      ? data.filter(item => item.toLowerCase().search(value.toLowerCase()) >= 0)
      : [];

  return (
    <SafeAreaView style={styles.container}>
      <SelectSearchInput
        title={title}
        value={value}
        disabled={!data || data.length === 0}
        onChangeText={text => {
          onChangeText(text.replace(/[\\]/g, ''));
        }}
        onFocus={() => {
          setSelected(false);
        }}
        {...props}
      />
      <View style={styles.flatList}>
        <FlatList
          data={selected ? [] : filterData}
          nestedScrollEnabled
          keyExtractor={(_, idx) => idx}
          renderItem={renderSelectableItem}
          persistentScrollbar
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectSearch;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  flatList: {
    width: '100%',
    maxHeight: 200,
    top: 0,
    top: -20,
    backgroundColor: '#F3F3FA',
    borderRadius: 7,
  },
  selectItem: {
    paddingVertical: 3,
  },
  texttitle: {
    fontSize: 15,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 45,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3FA',
    borderRadius: 8,
    paddingVertical: 15,
    borderColor: 'white',
  },
  fsize: {
    fontSize: 15,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
