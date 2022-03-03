import { Keyboard, StyleSheet, View } from 'react-native';
import { Icon, Rating, Text } from 'react-native-elements';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { backdropColor } from '../../styles/color';
import CustomInput from '../../components/CustomInput/CustomInput';
import PillButton from '../../components/CustomButton/PillButton';
import { COLORS } from '../../styles';
import { Value } from 'react-native-reanimated';
import ModalMess from '../../components/ModalMess';
import ratingApi from '../../api/ratingApi';
const OrderRating = ({ visible, onSwipeComplete, ...props }) => {
  const [height, setHeight] = useState(200);
  const [point, setPoint] = useState(2);
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState(null);
  const id_order = "61a982b712c1a7001641524f";
  const handleSubmit = () => {
    setHeight(200);
    Keyboard.dismiss();
    onSwipeComplete();
  };
  const handleClosed = () => {
    setHeight(200);
    Keyboard.dismiss();
    onSwipeComplete();
  };
  const alertType = {
    error: {
      type: 'danger',
      message: 'Đánh giá thất bại',
    },
    success: {
      type: 'success',
      message: 'Đánh giá thành công',
    },
  };
  return (
    <Modal
      onBackdropPress={onSwipeComplete}
      backdropColor={backdropColor}
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
          // reverse
          // reverseColor="#000"
          // color="#DDD"
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
          Bạn đánh giá thế nào về dịch vụ của chúng tôi :)
        </Text>
        <View style={{ marginVertical: 30 }}>
          <Rating 
          onFinishRating = {(Value)=>setPoint(Value)}
          />
        </View>
        <CustomInput
          placeholder="Cảm nhận của bạn"
          onFocus={() => setHeight(0)}
          onSubmitEditing={handleSubmit}
          onChangeText={text => setComment(text)}
        />
        <PillButton
          title="Gửi"
          onPress={()=>
            {
              ratingApi
              .ratingapi(id_order,{
                rating_point: point,
                rating_note: comment,
              })
              .then(data => setAlert(alertType.success))
              .catch(error => setAlert(alertType.error));
            }
          }
          buttonStyle={{ backgroundColor: COLORS.header }}
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
