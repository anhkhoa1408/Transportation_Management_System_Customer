import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Image, Text } from 'react-native-elements';
import { COLORS, STYLES, FONTS } from '../../styles';
import TextField from '../../components/TextField';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import banner from './../../assets/images/banner_signup.jpg';
import PrimaryButton from './../../components/CustomButton/PrimaryButton';
import Loading from './../../components/Loading';
import authApi from '../../api/authApi';
import ModalMess from '../../components/ModalMess';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Bonk.object({
      name: Bonk.string().required('Thông tin bắt buộc'),
      email: Bonk.string()
        .required('Thông tin bắt buộc')
        .email('Email không hợp lệ'),
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
      repeatPassword: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự')
        .oneOf(
          [Bonk.ref('password'), null],
          'Xác nhận mật khẩu và mật khẩu chưa chính xác',
        ),
    }),
    onSubmit: values => {
      Keyboard.dismiss();
      handleSubmit(values);
    },
  });

  const onAlertConfirm = value => {
    setAlert(value);
    if (alert.type === 'success') {
      navigation.navigate('Signin');
    }
  };

  const handleSubmit = values => {
    setLoading(<Loading />);
    authApi
      .register(values)
      .then(data => {
        setAlert({
          type: 'success',
          btnText: 'Đăng nhập',
          message: 'Đăng ký thành công!',
        });
        setLoading(null);
      })
      .catch(err => {
        try {
          const message = err.response.data.data[0].messages[0].id;
          if (message === 'Auth.form.error.email.taken')
            setAlert({
              type: 'warning',
              message: 'Email đã được sử dụng!',
            });
          else
            setAlert({
              type: 'warning',
              message: 'Thông tin không đúng!',
            });
        } catch (error) {
          setAlert({
            type: 'warning',
            message: 'Đăng ký thất bại!',
          });
        }
        setLoading(null);
        setDisabled(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="cover"
        style={{
          height: 250,
        }}
        source={banner}
      />
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          setAlert={onAlertConfirm}
          alert={alert}
        />
      )}
      {loading}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enableOnAndroid
        enableAutomaticScroll>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}>
          <Text style={styles.title}>Đăng ký</Text>
          <Text
            style={{
              fontSize: 15,
              color: 'rgba(0, 0, 0, 0.5)',
              paddingBottom: 20,
            }}>
            Trải nghiệm ngay dịch vụ vận chuyển liên tỉnh
          </Text>

          <TextField
            icon="person-outline"
            placeholder="Họ và Tên"
            value={formik.values.name}
            onChangeText={text => formik.setFieldValue('name', text)}
            error={formik.touched.name && formik.errors.name}
            errorMessage={formik.errors.name}
          />

          <TextField
            icon="email"
            placeholder="Email"
            value={formik.values.email}
            onChangeText={text => formik.setFieldValue('email', text)}
            error={formik.touched.email && formik.errors.email}
            errorMessage={formik.errors.email}
          />

          <TextField
            icon="https"
            placeholder="Mật khẩu mới"
            secureTextEntry
            value={formik.values.password}
            onChangeText={text => formik.setFieldValue('password', text)}
            error={formik.touched.password && formik.errors.password}
            errorMessage={formik.errors.password}
          />

          <TextField
            icon="lock"
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            value={formik.values.repeatPassword}
            onChangeText={text => formik.setFieldValue('repeatPassword', text)}
            error={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
            errorMessage={formik.errors.repeatPassword}
          />

          <PrimaryButton
            containerStyle={{
              marginTop: 30,
            }}
            backgroundColor={COLORS.success}
            title="Xác nhận"
            onPress={formik.submitForm}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.container1]}>
        <Text style={[FONTS.Medium]}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={{ ...FONTS.BigBold, color: COLORS.primary }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
    padding: 20,
  },
  container1: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    borderBottomColor: COLORS.success,
    borderBottomWidth: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },
});
