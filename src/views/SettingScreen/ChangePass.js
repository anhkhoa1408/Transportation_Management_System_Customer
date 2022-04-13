import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Bonk from 'yup';
import PillButton from '../../components/CustomButton/PillButton';
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
      handleSubmit(values);
    },
  });

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setUser(userInfo);
  //     setData({
  //       ...data,
  //       name: userInfo.user.name,
  //       email: userInfo.user.email,
  //     });
  //     if ('avatar' in userInfo.user)
  //       if ('url' in userInfo.user.avatar) setAvatar(userInfo.user.avatar.url);
  //     setDataChange(false);
  //     setDataChange(true);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const handleSubmit = values => {
    // setLoading(true);
    // let { name, email } = values;
    // let data = {
    //   name: name,
    //   email: email,
    // };
    // authApi
    //   .update(user.user.id, data)
    //   .then(response => {
    //     setLoading(false);
    //     dispatch(saveInfo(user));
    //     setAlert({
    //       type: 'success',
    //       message: 'Cập nhật thông tin thành công',
    //     });
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setAlert({
    //       type: 'error',
    //       message: 'Cập nhật thông tin thất bại',
    //     });
    //   });
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

      <ScrollView contentContainerStyle={{ padding: 25 }}>
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
        />

        {formik.touched.currPass && formik.errors.currPass ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.currPass}
          </Text>
        ) : null}

        <TextField
          title={t("settingScreen.newPassword")}
          style={styles.fsize}
          value={formik.values.password}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('password', text)}
        />

        {formik.touched.password && formik.errors.password ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.password}
          </Text>
        ) : null}

        <TextField
          title={t("settingScreen.confirmPassword")}
          style={styles.fsize}
          value={formik.values.confirmPassword}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
        />

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.confirmPassword}
          </Text>
        ) : null}

        <PillButton
          title={t("settingScreen.update")}
          buttonStyle={{ backgroundColor: success }}
          onPress={formik.submitForm}
        />
      </ScrollView>
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
