import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import TextField from '../../components/TextField';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import banner from '../../assets/images/password_banner.jpg';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { COLORS, STYLES, FONTS } from '../../styles';
import { useTranslation } from 'react-i18next';

const ForgotPass = ({ navigation, route }) => {
  const { t, i18n } = useTranslation("common")
  const [phone, setPhone] = useState('');
  const [isFocus, setFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const routeMetas = {
    forgot: {
      title: t("authScreen.forgotPassword"),
      banner: '',
      navigate: 'resetPass',
    },
    signin: {
      title: t("authScreen.logIn"),
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
        .required(t("authScreen.requiredInformation"))
        .min(10, t("authScreen.minimum10Digits"))
        .max(11, t("authScreen.max11Digits"))
        .matches(/(0[0-9]{9,10})/g, t("authScreen.invalidPhoneNumber")),
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
          width: 200,
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
          {t("authScreen.enterYourPhoneNumber")}
        </Text>
        <TextField
          keyboardType="numeric"
          icon="phone"
          placeholder={t("authScreen.phoneNumber")}
          value={formik.values.phone}
          onChangeText={setPhone}
          error={formik.touched.phone && formik.errors.phone}
          errorMessage={formik.errors.phone}
        />

        <PrimaryButton
          backgroundColor="#f55651"
          containerStyle={{ marginTop: 20 }}
          title={t("authScreen.getOTP")}
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
