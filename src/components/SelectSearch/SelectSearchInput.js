import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../styles';

export default function SelectSearchInput({
  afterText,
  disabled,
  icon,
  name,
  error,
  errorMessage,
  onBlur,
  onChangeText,
  value,
  title,
  style,
  ...props
}) {
  const [focus, setFocus] = useState(false);

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
    onBlur && onBlur();
  }

  return (
    <View style={{ marginBottom: 15 }}>
      {title && <Text style={styles.texttitle}>{title}</Text>}
      <View
        style={[
          styles.inputView,
          {
            borderColor: error
              ? COLORS.danger
              : focus
              ? COLORS.primary
              : COLORS.gray,
          },
        ]}>
        {icon && (
          <Icon
            name={icon}
            iconStyle={[
              {
                color: focus ? COLORS.primary : 'rgba(0,0,0,0.4)',
              },
            ]}
          />
        )}
        <TextInput
          name={name}
          style={[
            styles.fsize,
            {
              flex: 1,
            },
            disabled && styles.disabled,
            style,
          ]}
          placeholderTextColor={
            error ? COLORS.danger : focus ? COLORS.primary : 'rgba(0,0,0,0.4)'
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          editable={!disabled}
          {...props}
        />
        {afterText && (
          <Text
            style={{
              ...styles.fsize,
              color: 'rgba(0, 0, 0, 0.5)',
              marginRight: 10,
              textAlign: 'right',
            }}>
            {afterText}
          </Text>
        )}
      </View>
      {/* {error ? (
        <Text
          style={{
            color: COLORS.danger,
            fontWeight: 'bold',
          }}>
          {errorMessage}
        </Text>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  texttitle: {
    fontSize: 15,
    color: '#000000',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
  },
  fsize: {
    fontSize: 15,
    color: '#000',
    paddingLeft: 10,
    paddingVertical: 8,
  },
  textFocus: {
    color: COLORS.primary,
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});
