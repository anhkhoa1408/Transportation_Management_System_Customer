import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { COLORS } from '../../styles';
import { danger, primary, success, warning } from '../../styles/color';

const Confirm = props => {
  const { alert } = props;
  const { t } = useTranslation('common');
  const iconStyle = [
    {
      type: 'warning',
      name: 'error',
      color: warning,
      neutral: COLORS.neutralWarning,
      title: 'modalMess.warning',
    },
    {
      type: 'success',
      name: 'check-circle',
      color: success,
      neutral: COLORS.neutralSuccess,
      title: 'modalMess.success',
    },
    {
      type: 'danger',
      name: 'cancel',
      color: danger,
      neutral: COLORS.neutralDanger,
      title: 'modalMess.fail',
    },
    {
      type: 'question',
      name: 'help',
      color:  primary,
      neutral: COLORS.neutralPrimary,
      title: 'Gợi ý',
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
            {t(modalType.title)}
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            {props.message}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            buttonStyle={{ backgroundColor: modalType.neutral }}
            containerStyle={[style.buttonContainer]}
            title={props?.confirmBtnText ? props.confirmBtnText : 'Đồng ý'}
            type="solid"
            titleStyle={{
              color: modalType.color,
              textTransform: 'uppercase'
            }}
            onPress={props.onConfirm}
          />
          <Button
            buttonStyle={{ backgroundColor: COLORS.neutralDanger }}
            containerStyle={[style.buttonContainer]}
            titleStyle={{
              color: COLORS.danger,
              textTransform: 'uppercase'
            }}
            title={props?.cancelBtnText ? props.cancelBtnText : 'Hủy'}
            type="solid"
            onPress={props.onCancel}
          />
        </View>
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
    width: '80%',
    backgroundColor: '#FFF',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    top: '30%',
    borderRadius: 7,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Confirm;
