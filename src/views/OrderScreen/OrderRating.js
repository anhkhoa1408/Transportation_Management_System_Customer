import { Keyboard, StyleSheet, View } from 'react-native';
import { Icon, Rating, Text } from 'react-native-elements';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { backdropColor } from '../../styles/color';
import CustomInput from '../../components/CustomInput/CustomInput';
import PillButton from '../../components/CustomButton/PillButton';
import { COLORS } from '../../styles';

const OrderRating = ({ visible, onSwipeComplete, ...props }) => {
  const [height, setHeight] = useState(200);
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
          <Rating />
        </View>
        <CustomInput
          placeholder="Cảm nhận của bạn"
          onFocus={() => setHeight(0)}
          onSubmitEditing={handleSubmit}
        />
        <PillButton
          title="Gửi"
          onPress={handleSubmit}
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
