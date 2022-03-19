import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import TextField from '../../components/TextField';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import banner from '../../assets/images/password_banner.png';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { COLORS, STYLES, FONTS } from '../../styles';

const ForgotPass = ({ navigation, route }) => {
  const [phone, setPhone] = useState('');
  const [isFocus, setFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const routeMetas = {
    forgot: {
      title: 'Quên mật khẩu',
      banner: '',
      navigate: 'resetPass',
    },
    signin: {
      title: 'Đăng nhập',
      banner: '',
      navigate: 'Signin',
    },
  };

  useEffect(() => {
    setMeta(routeMetas[route.params.type]);
  }, []);

  const formatPhone = phone => {
    return '+84' + phone.slice(1);
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: phone,
    },
    validationSchema: Bonk.object({
      phone: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(10, 'Tối thiểu 10 chữ số')
        .max(11, 'Tối đa 11 chữ số')
        .matches(/(0[0-9]{9,10})/g, 'Số điện thoại không hợp lệ'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    navigation.navigate('inputOtp', {
      phone: formatPhone(values.phone),
      meta,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading}
      <Image
        resizeMode="contain"
        source={banner}
        style={{
          height: 220,
          marginBottom: 20,
        }}
      />
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>{meta?.title}</Text>
        <Text
          style={{
            fontSize: 15,
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          Nhập số điện thoại của bạn
        </Text>
        <TextField
          keyboardType="numeric"
          icon="phone"
          placeholder="Số điện thoại"
          value={formik.values.phone}
          onChangeText={setPhone}
          error={formik.touched.phone && formik.errors.phone}
          errorMessage={formik.errors.phone}
        />

        <PrimaryButton
          backgroundColor="#f55651"
          containerStyle={{ marginTop: 20 }}
          title="Lấy mã OTP"
          onPress={formik.submitForm}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPass;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    padding: 25,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomColor: '#f55651',
    borderBottomWidth: 5,
    marginBottom: 10,
  },
});
