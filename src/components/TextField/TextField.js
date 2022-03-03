import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../styles';

export default function TextField(props) {
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
    <View>
      {props.title && <Text style={styles.texttitle}>{props.title}</Text>}
      <View style={[styles.inputView, focus]}>
        {'icon' in props && (
          <Icon
            name={props.icon}
            iconStyle={
              ref.current && ref.current.isFocused()
                ? styles.textFocus
                : {
                    color: 'rgba(0,0,0,0.3)',
                  }
            }
          />
        )}
        <TextInput
          {...props}
          name={props.name}
          ref={ref}
          style={[styles.fsize, { flex: 1 }, props.disabled && styles.disabled]}
          placeholderTextColor={
            ref.current && ref.current.isFocused()
              ? COLORS.primary
              : 'rgba(0,0,0,0.3)'
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.afterText && (
          <Text
            style={{
              ...styles.fsize,
              color: 'rgba(0, 0, 0, 0.5)',
              marginRight: 10,
              textAlign: 'right',
            }}>
            {props.afterText}
          </Text>
        )}
        {props.afterComponent && props.afterComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  texttitle: {
    fontSize: 20,
    color: '#000000',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#F3F3FA',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
  textFocus: {
    color: COLORS.primary,
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});
