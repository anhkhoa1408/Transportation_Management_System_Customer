import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Bonk from 'yup';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import { COLORS, FONTS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';
import { useTranslation } from 'react-i18next';

const InputAddress = ({ navigation, route, ...props }) => {
  const { t, i18n } = useTranslation('common');
  const { type } = route?.params;

  useEffect(() => {
    let address = route?.params?.item?.[type] || route?.params?.[type]
    if (address) formik.setValues(address);
  }, [route.params]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      street: '',
      ward: '',
      province: '',
      city: '',
    },
    validationSchema: Bonk.object({
      street: Bonk.string().required(
        t('orderScreen.youHaveNotEnteredTheStreetName'),
      ),
      ward: Bonk.string().required(
        t('orderScreen.youHaveNotEnteredTheWardName'),
      ),
      province: Bonk.string().required(
        t('orderScreen.youHaveNotEnteredTheProvinceName'),
      ),
      city: Bonk.string().required(
        t('orderScreen.youHaveNotEnteredTheCityName'),
      ),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    const params =
      route.params?.previousScreen === 'EditOrderInfo'
        ? {
            item: {
              ...route.params?.item,
              [type]: {
                ...values,
              },
            },
          }
        : {
            [type]: {
              ...values,
            },
          };
    if (route.params?.previousScreen) {
      navigation.navigate({
        name: route.params?.previousScreen,
        params: params,
        merge: true,
      });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t('orderScreen.address')}
        rightElement={
          <Icon
            name="map"
            size={30}
            color={COLORS.primary}
            onPress={() =>
              navigation.navigate('MapScreen', {
                ...route.params,
                previousScreen: 'InputAddress',
              })
            }
          />
        }
      />
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        contentContainerStyle={[style.form]}>
        <Text style={[FONTS.SmolBold, { marginBottom: 15 }]}>
          {t('orderScreen.enterAddress')}{' '}
          {type === 'from_address'
            ? t('orderScreen.send')
            : t('orderScreen.receive')}
        </Text>

        <TextField
          title={t('orderScreen.houseNumber,StreetName')}
          value={formik.values.street}
          onChangeText={text => formik.setFieldValue('street', text)}
          error={formik.touched.street && formik.errors.street}
          errorMessage={formik.errors.street}
        />

        <TextField
          title={t('orderScreen.wards')}
          value={formik.values.ward}
          error={formik.touched.ward && formik.errors.ward}
          errorMessage={formik.errors.ward}
          onBlur={() => formik.setFieldTouched('ward')}
          onChangeText={text => formik.setFieldValue('ward', text)}
        />

        <TextField
          title={t('orderScreen.province')}
          value={formik.values.province}
          error={formik.touched.province && formik.errors.province}
          errorMessage={formik.errors.province}
          onBlur={() => formik.setFieldTouched('province')}
          onChangeText={text => formik.setFieldValue('province', text)}
        />

        <TextField
          title={t('orderScreen.city')}
          value={formik.values.city}
          error={formik.touched.city && formik.errors.city}
          errorMessage={formik.errors.city}
          onBlur={() => formik.setFieldTouched('city')}
          onChangeText={text => formik.setFieldValue('city', text)}
        />

        <PrimaryButton
          title={t('orderScreen.add')}
          onPress={formik.submitForm}
          containerStyle={{ marginTop: 30 }}
        />
      </KeyboardAwareScrollView>
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

export default InputAddress;
