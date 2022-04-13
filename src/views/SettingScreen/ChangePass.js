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
import { useTranslation } from 'react-i18next';

const ChangePass = ({ navigation }) => {
  const { t, i18n } = useTranslation("common")
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
      currPass: Bonk.string().required(t("settingScreen.requiredInformation")),
      password: Bonk.string()
        .required(t("settingScreen.requiredInformation"))
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, t("settingScreen.invalidPassword"))
        .min(8, t("settingScreen.passwordMustBeAtLeast8Characters")),
      confirmPassword: Bonk.string()
        .required(t("settingScreen.requiredInformation"))
        .oneOf(
          [Bonk.ref('password'), null],
          t("settingScreen.passwordAndConfirmPasswordDoNotMatch"),
        )
        .min(8, t("settingScreen.passwordMustBeAtLeast8Characters")),
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
        headerText={t("settingScreen.changePassword")}
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
          {t("settingScreen.newPasswordMustBeAtLeast8Characters,IncludingCapitalLetters")}
        </Text>

        <TextField
          title={t("settingScreen.currentPassword")}
          style={styles.fsize}
          value={formik.values.currPass}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('currPass', text)}
          error={formik.touched.currPass && formik.errors.currPass}
          errorMessage={formik.errors.currPass}
          onBlur={() => formik.setFieldTouched('currPass')}
        />

        <TextField
          title={t("settingScreen.newPassword")}
          style={styles.fsize}
          value={formik.values.password}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('password', text)}
          error={formik.touched.password && formik.errors.password}
          errorMessage={formik.errors.password}
          onBlur={() => formik.setFieldTouched('password')}
        />

        <TextField
          title={t("settingScreen.confirmPassword")}
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
          title={t("settingScreen.update")}
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
