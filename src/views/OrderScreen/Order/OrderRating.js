import { Keyboard, StyleSheet, View } from 'react-native';
import { Icon, Rating, Text } from 'react-native-elements';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import CustomInput from '../../../components/CustomInput/CustomInput';
import PillButton from '../../../components/CustomButton/PillButton';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import { COLORS } from '../../../styles';
import ModalMess from '../../../components/ModalMess';
import orderApi from '../../../api/orderApi';
import { useTranslation } from 'react-i18next';

const OrderRating = ({ visible, onSwipeComplete, item, onChangeItem, ...props }) => {
  const [height, setHeight] = useState(220);
  const [point, setPoint] = useState(0);
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState(null);
  const { t, i18n } = useTranslation("common")
  const handleSubmit = () => {
    setHeight(220);
    Keyboard.dismiss();
    orderApi
      .feedback(item.id, {
        rating_point: point,
        rating_note: comment,
      })
      .then(data => {
        setAlert(alertType.success);
        onChangeItem(data)
      })
      .catch(error => {
        setAlert(alertType.error);
      });
  };

  const handleClosed = () => {
    setHeight(220);
    Keyboard.dismiss();
    onSwipeComplete();
  };

  const alertType = {
    error: {
      type: 'danger',
      message: t("orderScreen.rateFailed"),
    },
    success: {
      type: 'success',
      message: t("orderScreen.thankYouForRating"),
    },
  };

  return (
    <Modal
      onBackdropPress={onSwipeComplete}
      backdropColor={COLORS.backdropColor}
      backdropOpacity={0.4}
      style={{
        margin: 0,
        top: height,
      }}
      isVisible={visible}
      onSwipeComplete={handleClosed}
      swipeDirection={['up', 'down']}>
      <View style={[styles.container]}>
        {alert && (
          <ModalMess
            type={alert.type}
            message={alert.message}
            setAlert={setAlert}
            alert={alert}
          />
        )}
        <Icon
          name="close"
          containerStyle={{
            alignSelf: 'flex-end',
            marginVertical: 15,
            marginRight: -15,
          }}
          size={25}
          onPress={handleClosed}
        />
        <Text
          h4
          h4Style={{
            color: '#000',
            fontSize: 28,
            textAlign: 'center',
            fontWeight: '600',
            marginBottom: 15,
            width: '100%',
            alignSelf: 'center',
          }}>
          {' '}
          {t("orderScreen.howDoYouRateOurService?")}
        </Text>

        <View style={{ marginVertical: 30 }}>
          <Rating
            startingValue={0}
            fraction={'0'}
            onFinishRating={Value => setPoint(Value)}
          />
        </View>

        <CustomInput
          placeholder={t("orderScreen.yourFeeling")}
          onFocus={() => setHeight(0)}
          onSubmitEditing={handleSubmit}
          onChangeText={text => setComment(text)}
        />

        <PrimaryButton
          title={t("orderScreen.sendFeedback")}
          onPress={handleSubmit}
        />
      </View>
    </Modal>
  );
};

export default OrderRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 50,
  },
});
