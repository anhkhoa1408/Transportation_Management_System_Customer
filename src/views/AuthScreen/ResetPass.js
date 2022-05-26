import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import * as Bonk from 'yup';
import authApi from '../../api/authApi';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import ModalMess from '../../components/ModalMess';
import TextField from '../../components/TextField';
import { COLORS, FONTS, STYLES } from '../../styles';
import Loading from './../../components/Loading';

const ResetPass = ({ navigation, route }) => {
  const { t, i18n } = useTranslation('common');
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const alertType = {
    error: {
      type: 'danger',
      message: t('authScreen.passwordUpdateFailed'),
    },
    success: {
      type: 'success',
      message: t('authScreen.passwordUpdateSuccessful'),
      btnText: t('authScreen.logIn'),
    },
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      password: Bonk.string()
        .required(t('authScreen.requiredInformation'))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
          t(
            'authScreen.newPasswordMustBeAtLeast8Characters,IncludingCapitalLetters',
          ),
        )
        .min(8, 't("authScreen.passwordMustBeAtLeast8Characters")'),
      confirmPassword: Bonk.string()
        .required(t('authScreen.requiredInformation'))
        .oneOf(
          [Bonk.ref('password'), null],
          t('authScreen.passwordAndConfirmPasswordDoNotMatch'),
        )
        .min(8, t('authScreen.passwordMustBeAtLeast8Characters')),
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
        <Text style={styles.title}>{t('authScreen.changePassword')}</Text>
        <Text
          style={{
            marginBottom: 5,
            color: 'rgba(0,0,0,0.5)',
          }}>
          {t('authScreen.enterANewPasswordForYourAccount')}
        </Text>
        <TextField
          icon="https"
          placeholder={t('authScreen.newPassword')}
          secureTextEntry
          value={formik.values.password}
          onChangeText={text => formik.setFieldValue('password', text)}
          error={formik.touched.password && formik.errors.password}
          errorMessage={formik.errors.password}
        />

        <TextField
          icon="https"
          placeholder={t('authScreen.confirmPassword')}
          value={formik.values.confirmPassword}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          errorMessage={formik.errors.confirmPassword}
        />

        <PrimaryButton
          title={t('authScreen.confirm')}
          onPress={formik.submitForm}
        />
      </View>
      <View style={[styles.container1]}>
        <Text style={[FONTS.Medium]}>
          {t('authScreen.changePasswordSuccessfully')}?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={{ ...FONTS.BigBold, color: COLORS.primary }}>
            {t('authScreen.login')}
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
