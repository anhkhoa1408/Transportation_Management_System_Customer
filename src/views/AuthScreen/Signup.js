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

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeat] = useState('');

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    },
    validationSchema: Bonk.object({
      email: Bonk.string().required('Thông tin bắt buộc'),
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
      setFocus('');
      Keyboard.dismiss();
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {};

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="cover"
        style={{
          height: 250,
        }}
        source={banner}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior="padding"
        keyboardVerticalOffset={20}>
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
            }}>
            Trải nghiệm ngay dịch vụ vận chuyển liên tỉnh
          </Text>
          <TextField
            icon="person-outline"
            placeholder="Tên đăng nhập"
            value={formik.values.email}
            onChangeText={setEmail}
          />

          {formik.touched.email && formik.errors.email ? (
            <Text
              style={{
                color: COLORS.danger,
                marginBottom: 5,
                fontWeight: 'bold',
              }}>
              {formik.errors.email}
            </Text>
          ) : null}

          <TextField
            icon="lock"
            placeholder="Mật khẩu"
            value={formik.values.password}
            secureTextEntry
            onChangeText={setPassword}
          />

          {formik.touched.email && formik.errors.email ? (
            <Text
              style={{
                color: COLORS.danger,
                marginBottom: 5,
                fontWeight: 'bold',
              }}>
              {formik.errors.email}
            </Text>
          ) : null}

          <TextField
            icon="lock"
            placeholder="Xác nhận mật khẩu"
            value={formik.values.repeatPassword}
            secureTextEntry
            onChangeText={setRepeat}
          />

          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <Text
              style={{
                color: COLORS.danger,
                marginBottom: 5,
                fontWeight: 'bold',
              }}>
              {formik.errors.repeatPassword}
            </Text>
          ) : null}

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
