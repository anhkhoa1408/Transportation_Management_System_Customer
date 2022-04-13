import { useFormik } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import * as Bonk from 'yup';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import Header from '../../../components/Header';
import OrderStep from '../../../components/StepIndicator/OrderStep';
import TextField from '../../../components/TextField';
import { FONTS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';
import { useTranslation } from 'react-i18next';

const InputReceiver = ({ navigation, route }) => {
  const { t, i18n } = useTranslation("common")
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      receiverName: '',
      receiverPhone: '',
    },
    validationSchema: Bonk.object({
      receiverName: Bonk.string().required(t("orderScreen.youHaveNotEnteredTheReceiver'sName")),
      receiverPhone: Bonk.string().required(
        t("orderScreen.youHaveNotEnteredTheReceiver'sPhoneNumber"),
      ),
    }),
    onSubmit: values => {
      navigation.navigate('InputPackage', {
        ...route.params,
        receiver_name: values.receiverName,
        receiver_phone: values.receiverPhone,
      });
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t("orderScreen.transport")}
      />
      <OrderStep current={0} />
      <View
        style={[style.form, { flex: 1 }]}
        contentContainerStyle={{ padding: 30, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            {t("orderScreen.enterReceiver'sInformation")}
          </Text>
          <TextField
            title={t("orderScreen.receiver'sName")}
            value={formik.values.receiverName}
            onBlur={() => formik.setFieldTouched('receiverName')}
            onChangeText={text => formik.setFieldValue('receiverName', text)}
            error={formik.touched.receiverName && formik.errors.receiverName}
            errorMessage={formik.errors.receiverName}
          />
          <TextField
            title={t("orderScreen.phoneNumber")}
            keyboardType="numeric"
            value={formik.values.receiverPhone}
            onBlur={() => formik.setFieldTouched('receiverPhone')}
            onChangeText={text => formik.setFieldValue('receiverPhone', text)}
            error={formik.touched.receiverPhone && formik.errors.receiverPhone}
            errorMessage={formik.errors.receiverPhone}
          />
        </View>
        <PrimaryButton
          title={t("orderScreen.addPackages")}
          onPress={formik.submitForm}
          containerStyle={{ marginTop: '50%' }}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default InputReceiver;
