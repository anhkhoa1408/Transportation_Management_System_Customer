import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { COLORS, FONTS, STYLES } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger, success, warning } from '../../styles/color';
import banner from './../../assets/images/otp_banner.png';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { Divider, Image, Text } from 'react-native-elements';
import { getPhoneNumberVerificator, getPhoneToken } from '../../config/OAuth';

const InputOtp = ({ navigation, route }) => {
  const { meta, phone } = route.params;
  const [vCode, setVCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [verificator, setVerificator] = useState(null);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: vCode,
    },
    validationSchema: Bonk.object({
      code: Bonk.string()
        .required('Thông tin bắt buộc')
        .length(6, 'Mã xác nhận gồm 6 chữ số'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    if (verificator) {
      getPhoneToken(verificator, values.code).then(token =>
        navigation.navigate({
          name: meta.navigate,
          params: { token: token },
          merge: true,
        }),
      );
    }
  };

  const reSent = () => {
    setTimer(60);
    getPhoneNumberVerificator(phone, true).then(data => setVerificator(data));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    getPhoneNumberVerificator(phone, true).then(data => setVerificator(data));
  }, [route.params?.phone]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.background}
        source={banner}
        containerStyle={{
          height: 250,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            alignSelf: 'center',
            marginBottom: 5,
            color: 'rgba(0,0,0,0.5)',
          }}>
          Kiểm tra điện thoại của bạn và nhập mã OTP từ tin nhắn
        </Text>
        <TextField
          keyboardType="numeric"
          icon="phone"
          placeholder="Nhập mã OTP"
          value={formik.values.code}
          onChangeText={setVCode}
          error={formik.touched.code && formik.errors.code}
          errorMessage={formik.errors.code}
        />

        <PrimaryButton
          title="Xác nhận"
          backgroundColor={COLORS.header}
          onPress={formik.submitForm}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Divider
            width={1}
            style={{ marginVertical: 20, flex: 1 }}
            color={COLORS.header}
          />
          <Text style={{ paddingHorizontal: 20 }}>hoặc</Text>
          <Divider
            width={1}
            style={{ marginVertical: 20, flex: 1 }}
            color={COLORS.header}
          />
        </View>

        <PrimaryButton
          disabled={timer !== 0}
          disabledStyle={{
            backgroundColor: COLORS.neutralWarning,
          }}
          title={`Gửi lại mã ${timer ? '(' + timer + ')' : ''}`}
          backgroundColor={COLORS.warning}
          onPress={reSent}
        />
      </View>
    </SafeAreaView>
  );
};

export default InputOtp;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
    padding: 20,
  },
});
