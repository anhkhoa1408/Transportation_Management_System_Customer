import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';

export default function TextField(props) {
  return (
    <View>
      {'title' in props && <Text style={styles.texttitle}>{props.title}</Text>}
      <View style={styles.inputView}>
        {'icon' in props && <Icon name={props.icon} />}
        <TextInput style={{ ...styles.fsize }} {...props} />
        {'afterText' in props && (
          <Text
            style={{ ...styles.fsize, marginRight: 10, textAlign: 'right' }}>
            {props.afterText}
          </Text>
        )}
        {'afterImage' in props && props.afterImage}
        {/* <Tooltip
          height={100}
          width={250}
          overlayColor="rgba(0,0,0,0.2)"
          backgroundColor="#FFF"
          containerStyle={{ alignSelf: 'flex-end' }}
          popover={
            <Text style={{ color: COLORS.danger, fontSize: 16 }}>
              Mật khẩu phải tối thiểu 9 ký tự chữ cái
            </Text>
          }>
          <Icon name="error" color="red" />
        </Tooltip> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
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
