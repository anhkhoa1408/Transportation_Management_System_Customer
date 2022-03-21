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

const InputAddress = ({ navigation, route, ...props }) => {
  const { type } = route?.params;

  useEffect(() => {
    if (route.params[type]) formik.setValues(route.params[type]);
  }, [route.params?.from_address, route.params?.to_address]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      street: '',
      ward: '',
      province: '',
      city: '',
    },
    validationSchema: Bonk.object({
      street: Bonk.string().required('Bạn chưa nhập tên đường'),
      ward: Bonk.string().required('Bạn chưa nhập tên quận'),
      province: Bonk.string().required('Bạn chưa nhập tên quận'),
      city: Bonk.string().required('Bạn chưa nhập thành phố'),
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
        headerText={'Địa chỉ'}
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
          Nhập địa chỉ người {type === 'from_address' ? 'gửi' : 'nhận'}
        </Text>

        <TextField
          title="Số nhà, tên đường"
          value={formik.values.street}
          onChangeText={text => formik.setFieldValue('street', text)}
          error={formik.touched.street && formik.errors.street}
          errorMessage={formik.errors.street}
        />

        <TextField
          title="Phường / xã"
          value={formik.values.ward}
          error={formik.touched.ward && formik.errors.ward}
          errorMessage={formik.errors.ward}
          onBlur={() => formik.setFieldTouched('ward')}
          onChangeText={text => formik.setFieldValue('ward', text)}
        />

        <TextField
          title="Quận / huyện"
          value={formik.values.province}
          error={formik.touched.province && formik.errors.province}
          errorMessage={formik.errors.province}
          onBlur={() => formik.setFieldTouched('province')}
          onChangeText={text => formik.setFieldValue('province', text)}
        />

        <TextField
          title="Thành phố"
          value={formik.values.city}
          error={formik.touched.city && formik.errors.city}
          errorMessage={formik.errors.city}
          onBlur={() => formik.setFieldTouched('city')}
          onChangeText={text => formik.setFieldValue('city', text)}
        />

        <PrimaryButton
          title="Thêm"
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
