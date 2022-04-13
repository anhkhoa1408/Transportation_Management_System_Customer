import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Bonk from 'yup';
import PillButton from '../../components/CustomButton/PillButton';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ModalMess from '../../components/ModalMess';
import TextField from '../../components/TextField';
import { store } from '../../config/configureStore';
import { COLORS } from '../../styles';
import { danger, success } from '../../styles/color';

const ChangePass = ({ navigation }) => {
  const [data, setData] = useState({
    currPass: '',
    password: '',
    confirmPassword: '',
  });

  const { userInfo } = store.getState();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      currPass: Bonk.string().required('Thông tin bắt buộc'),
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
      authApi
        .changepassword({
          password: values.currPass,
          newPassword: values.password,
        })
        .then(data => setAlert(alertType.success))
        .catch(error => setAlert(alertType.error));
    },
  })

  const alertType = {
    error: {
      type: 'danger',
      message: 'Cập nhật mật khẩu thất bại',
    },
    success: {
      type: 'success',
      message: 'Cập nhật mật khẩu thành công',
    },
  };
  
  return (
    <SafeAreaView style={styles.screen}>
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          setAlert={setAlert}
          alert={alert}
        />
      )}
      {loading && <Loading />}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText="Đổi mật khẩu"
      />

      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        contentContainerStyle={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 25,
          }}>
          Mật khẩu mới phải tối thiểu 8 ký tự, bao gồm chữ in hoa, số và khác
          với mật khẩu hiện tại
        </Text>

        <TextField
          title="Mật khẩu hiện tại"
          style={styles.fsize}
          value={formik.values.currPass}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('currPass', text)}
          error={formik.touched.currPass && formik.errors.currPass}
          errorMessage={formik.errors.currPass}
          onBlur={() => formik.setFieldTouched('currPass')}
        />

        <TextField
          title="Mật khẩu mới"
          style={styles.fsize}
          value={formik.values.password}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('password', text)}
          error={formik.touched.password && formik.errors.password}
          errorMessage={formik.errors.password}
          onBlur={() => formik.setFieldTouched('password')}
        />

        <TextField
          title="Xác nhận mật khẩu"
          style={styles.fsize}
          value={formik.values.confirmPassword}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          errorMessage={formik.errors.confirmPassword}
          onBlur={() => formik.setFieldTouched('confirmPassword')}
        />

        <PrimaryButton
          title="Cập nhật"
          backgroundColor={COLORS.success}
          onPress={formik.submitForm}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
