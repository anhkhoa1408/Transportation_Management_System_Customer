import { useFormik } from 'formik';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Bonk from 'yup';
import Header from '../../../components/Header';

import SelectSearch from '../../../components/SelectSearch';
import TextField from '../../../components/TextField';
import cities from '../../../constants/citiesDict';
import { COLORS, FONTS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';

const EditOrderAddress = ({ navigation, route }) => {
  const { t, i18n } = useTranslation('common');
  const { item = {}, type } = route?.params;
  const address = route?.params?.[type] || route?.params?.item?.[type];

  const [city, setCity] = useState(address?.city || '');
  const [district, setDistrict] = useState(address?.province || '');
  const [ward, setWard] = useState(address?.ward || '');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      city: address?.city || '',
      district: address?.province || '',
      ward: address?.ward || '',
      street: address?.street || '',
    },
    validationSchema: Bonk.object({
      city: Bonk.string().required(
        t('templateScreen.youHaveNotEnteredTheCityName'),
      ),
      district: Bonk.string().required(
        t('templateScreen.youHaveNotEnteredTheProvinceName'),
      ),
      ward: Bonk.string().required(
        t('templateScreen.youHaveNotEnteredTheWardName'),
      ),
      street: Bonk.string().required(
        t('templateScreen.youHaveNotEnteredTheStreetName'),
      ),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = ({ city, district: province, ward, street }) => {
    if (route?.params?.previousScreen) {
      const newAddress = { city, province, ward, street };
      let params =
        route.params.previousScreen === 'EditOrderInfo'
          ? {
              item: {
                ...route.params.item,
                [type]: newAddress,
              },
            }
          : {
              [type]: newAddress,
            };
      params = { ...route.params, ...params };
      navigation.navigate({
        name: 'MapScreen',
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
        headerText={t('orderScreen.enterAddress')}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={style.form}
        enableOnAndroid
        enableAutomaticScroll>
        <Text style={[FONTS.BigBold, { marginBottom: 10 }]}>
          {t('orderScreen.enterAddress')}
        </Text>
        <SelectSearch
          title={t('templateScreen.city')}
          data={cities.data}
          error={formik.touched.city && formik.errors.city}
          errorMessage={formik.errors.city}
          value={city}
          onChangeText={text => {
            formik.setFieldError('city', '');
            setCity(text);
            setDistrict('');
            setWard('');
          }}
          onChoose={text => {
            setCity(text);
            formik.setFieldValue('city', text);
          }}
        />
        <SelectSearch
          title={t('templateScreen.province')}
          data={city && cities?.[city]?.data}
          error={!district && formik.touched.district && formik.errors.district}
          errorMessage={formik.errors.district}
          onBlur={() => formik.setFieldTouched('district')}
          value={district}
          onChangeText={text => {
            formik.setFieldError('district', '');
            setDistrict(text);
            setWard('');
          }}
          onChoose={text => {
            setDistrict(text);
            formik.setFieldValue('district', text);
          }}
        />
        <SelectSearch
          title={t('templateScreen.wards')}
          data={district && cities?.[city]?.[district]}
          error={!ward && formik.touched.ward && formik.errors.ward}
          errorMessage={formik.errors.ward}
          onBlur={() => formik.setFieldTouched('ward')}
          value={ward}
          onChangeText={text => {
            formik.setFieldError('ward', '');
            setWard(text);
          }}
          onChoose={text => {
            setWard(text);
            formik.setFieldValue('ward', text);
          }}
        />
        <TextField
          title={t('templateScreen.houseNumber,StreetName')}
          value={formik.values.street}
          error={formik.touched.street && formik.errors.street}
          errorMessage={formik.errors.street}
          onBlur={() => formik.setFieldTouched('street')}
          onChangeText={text => formik.setFieldValue('street', text)}
        />
        <PrimaryButton
          title={t('orderScreen.confirm')}
          onPress={formik.submitForm}
          containerStyle={{ marginVertical: 20 }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
    flex: 1,
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  form: {
    paddingHorizontal: 30,
  },
});

export default memo(EditOrderAddress);
