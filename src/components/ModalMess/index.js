import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { danger, success, warning } from '../../styles/color';
import PillButton from '../CustomButton/PillButton';

const ModalMess = props => {
  const { alert, setAlert } = props;
  const iconStyle = [
    {
      type: 'warning',
      name: 'error',
      color: warning,
      title: 'Cảnh báo',
    },
    {
      type: 'success',
      name: 'check-circle',
      color: success,
      title: 'Thành công',
    },
    {
      type: 'danger',
      name: 'cancel',
      color: danger,
      title: 'Thất bại',
    },
  ];
  const modalType = iconStyle.find(element => element.type === props.type);
  return (
    <View style={style.container}>
      <Modal
        style={style.modal}
        isVisible={alert !== null}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={400}
        animationOutTiming={400}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <Icon
            type="material"
            name={modalType.name}
            size={50}
            color={modalType.color}
            style={{ marginBottom: 10 }}
          />
          <Text h4 h4Style={{ textAlign: 'center', marginBottom: 10 }}>
            {modalType.title}
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            {props.message}
          </Text>
        </View>
        <Button
          buttonStyle={{ backgroundColor: modalType.color }}
          containerStyle={style.buttonContainer}
          title="ĐÓNG"
          type="solid"
          onPress={() => setAlert(null)}
        />
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  modal: {
    height: '28%',
    width: '80%',
    backgroundColor: '#FFF',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    top: '30%',
    borderRadius: 7,
  },
  // buttonContainer: {
  //   borderRadius: 20,
  // },
});

export default ModalMess;
