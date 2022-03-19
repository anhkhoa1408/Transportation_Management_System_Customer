import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS, STYLES, FONTS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger, success } from '../../styles/color';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import ModalMess from '../../components/ModalMess';

const ResetPass = ({ navigation, route }) => {
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const alertType = {
    error: {
      type: 'danger',
      message: 'Cập nhật mật khẩu thất bại',
    },
    success: {
      type: 'success',
      message: 'Cập nhật mật khẩu thành công',
      btnText: 'Đăng nhập',
    },
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
          'Mật khẩu mới phải tối thiểu 8 ký tự, bao gồm chữ in hoa',
        )
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
      confirmPassword: Bonk.string()
        .required('Thông tin bắt buộc')
        .oneOf(
          [Bonk.ref('password'), null],
          'Mật khẩu và xác nhận mật khẩu không khớp',
        )
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    }),
    onSubmit: values => {
      handleSubmit(values.password);
    },
  });

  const handleSubmit = newPassword => {
    setLoading(<Loading />);
    authApi
      .resetPassword({ token: route.params.token, newPassword })
      .then(data => {
        setLoading(false);
        setAlert(alertType.success);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response.status, JSON.stringify(err.response.data));
        setAlert(alertType.error);
      });
  };

  const onAlertConfirm = value => {
    setAlert(value);
    if (alert.type === 'success') {
      navigation.navigate('Signin');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          setAlert={onAlertConfirm}
          alert={alert}
        />
      )}
      <View style={{ paddingHorizontal: 20, marginTop: '40%', flex: 1 }}>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        <Text
          style={{
            marginBottom: 5,
            color: 'rgba(0,0,0,0.5)',
          }}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </Text>
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
          icon="https"
          placeholder="Xác nhận mật khẩu"
          value={formik.values.confirmPassword}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          errorMessage={formik.errors.confirmPassword}
        />

        <PrimaryButton title="Xác nhận" onPress={formik.submitForm} />
      </View>
      <View style={[styles.container1]}>
        <Text style={[FONTS.Medium]}>Đổi mật khẩu thành công? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={{ ...FONTS.BigBold, color: COLORS.primary }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },
});

export default ResetPass;
