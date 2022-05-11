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
import { store } from '../../../config/configureStore';

const InputReceiver = ({ navigation, route }) => {
  const userInfo = store.getState().userInfo.user;
  const { t, i18n } = useTranslation('common');
  const _meta = route.params?.inputReceiver
    ? {
        bonkName: "orderScreen.youHaveNotEnteredTheReceiver'sName",
        bonkPhone: "orderScreen.youHaveNotEnteredTheReceiver'sPhoneNumber",
        title: 'orderScreen.enterReceiverInformation',
        name: "orderScreen.receiver'sName",
        nextButton: 'orderScreen.addPackages',
      }
    : {
        bonkName: "orderScreen.youHaveNotEnteredTheSender'sName",
        bonkPhone: "orderScreen.youHaveNotEnteredTheSender'sPhoneNumber",
        title: 'orderScreen.enterSenderInformation',
        name: "orderScreen.sender'sName",
        nextButton: 'orderScreen.enterReceiverInformation',
      };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: route.params?.inputReceiver
      ? {
          receiverName: '',
          receiverPhone: '',
        }
      : {
          receiverName: userInfo?.name ? userInfo?.name : '',
          receiverPhone: userInfo?.phone ? userInfo?.phone : '',
        },
    validationSchema: Bonk.object({
      receiverName: Bonk.string().required(t(_meta.bonkName)),
      receiverPhone: Bonk.string()
        .required(t(_meta.bonkPhone))
        .test('phone-test', t('templateScreen.invalidPhone'), (value, ctx) => {
          let regex = new RegExp(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          );
          if (regex.test(value)) {
            return true;
          }
          return false;
        }),
    }),
    onSubmit: values => {
      if (route.params?.inputReceiver)
        navigation.navigate('InputPackage', {
          ...route.params,
          receiver_name: values.receiverName,
          receiver_phone: values.receiverPhone,
        });
      else
        navigation.navigate('InputReceiver', {
          ...route.params,
          sender_name: values.receiverName,
          sender_phone: values.receiverPhone,
          inputReceiver: true,
        });
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t('orderScreen.transport')}
      />
      <OrderStep current={0} />
      <View
        style={[style.form, { flex: 1 }]}
        contentContainerStyle={{ padding: 30, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            {t(_meta.title)}
          </Text>
          <TextField
            title={t(_meta.name)}
            value={formik.values.receiverName}
            onBlur={() => formik.setFieldTouched('receiverName')}
            onChangeText={text => formik.setFieldValue('receiverName', text)}
            error={formik.touched.receiverName && formik.errors.receiverName}
            errorMessage={formik.errors.receiverName}
          />
          <TextField
            title={t('orderScreen.phoneNumber')}
            keyboardType="numeric"
            value={formik.values.receiverPhone}
            onBlur={() => formik.setFieldTouched('receiverPhone')}
            onChangeText={text => formik.setFieldValue('receiverPhone', text)}
            error={formik.touched.receiverPhone && formik.errors.receiverPhone}
            errorMessage={formik.errors.receiverPhone}
          />
        </View>
        <PrimaryButton
          title={t(_meta.nextButton)}
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
