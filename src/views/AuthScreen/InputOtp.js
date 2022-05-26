import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { COLORS, FONTS, STYLES } from '../../styles';
import TextField from '../../components/TextField';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger, success, warning } from '../../styles/color';
import banner from './../../assets/images/otp_banner.jpg';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { Divider, Image, Text } from 'react-native-elements';
import { getPhoneNumberVerificator, getPhoneToken } from '../../config/OAuth';
import { useTranslation } from 'react-i18next';
import ModalMess from '../../components/ModalMess';

const InputOtp = ({ navigation, route }) => {
  const { t, i18n } = useTranslation('common');
  const { meta, phone } = route.params;
  const [vCode, setVCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [verificator, setVerificator] = useState(null);
  const [alert, setAlert] = useState(null);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: vCode,
    },
    validationSchema: Bonk.object({
      code: Bonk.string()
        .required(t('authScreen.requiredInformation'))
        .length(6, t('authScreen.6-digitConfirmationCode')),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    if (verificator) {
      getPhoneToken(verificator, values.code)
        .then(token =>
          navigation.navigate({
            name: meta.navigate,
            params: { token: token },
            merge: true,
          }),
        )
        .catch(error => {
          console.log(error);
          setAlert(true);
        });
    } else {
      setAlert(true);
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
      {/* {alert && ( */}
      <ModalMess
        type={'danger'}
        message={t('authScreen.errorOTP')}
        setAlert={setAlert}
        alert={alert}
      />
      {/* )} */}
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
          {t('authScreen.checkYourPhoneAndEnterTheOTPFromTheMessage')}
        </Text>
        <TextField
          keyboardType="numeric"
          icon="phone"
          placeholder={t('authScreen.enterOTP')}
          value={formik.values.code}
          onChangeText={setVCode}
          error={formik.touched.code && formik.errors.code}
          errorMessage={formik.errors.code}
        />

        <PrimaryButton
          title={t('authScreen.confirm')}
          backgroundColor={COLORS.header}
          onPress={formik.submitForm}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Divider
            width={1}
            style={{ marginVertical: 20, flex: 1 }}
            color={COLORS.header}
          />
          <Text style={{ paddingHorizontal: 20 }}>{t('authScreen.or')}</Text>
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
          title={`${t('authScreen.resendCode')} ${
            timer ? '(' + timer + ')' : ''
          }`}
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
