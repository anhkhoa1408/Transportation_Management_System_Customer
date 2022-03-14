import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import Select from '../../../components/Select/Select';
import { COLORS, FONTS } from '../../../styles';
import OrderStep from '../../../components/StepIndicator/OrderStep';
import { provinces } from '../../../constants/province';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const InputAddress = ({ navigation, route, ...props }) => {
  const { type } = route?.params;
  const cities = useMemo(() => {
    return provinces.map(item => ({
      label: item.name,
      value: item,
    }));
  }, []);
  const [selectCity, setSelectCity] = useState();

  const [districts, setDistricts] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState();

  const [wards, setWards] = useState([]);
  const [selectWard, setSelectWard] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      street: '',
    },
    validationSchema: Bonk.object({
      street: Bonk.string().required('Bạn chưa nhập tên đường'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = ({ street }) => {
    navigation.navigate('InputInfo', {
      ...route.params,
      [type]: {
        street: street,
        ward: selectWard,
        province: selectDistrict.name,
        city: selectCity.name,
      },
    });
  };

  const handleSelectCity = city => {
    setSelectCity(city);
    let districts = city.districts.map(item => ({
      label: item.name,
      value: item,
    }));

    setDistricts(districts);
  };

  const handleSelectDistrict = district => {
    setSelectDistrict(district);
    let wards = district.wards.map(item => ({
      label: item,
      value: item,
    }));
    setWards(wards);
  };

  useEffect(() => {
    if (Array.isArray(districts) && districts[0]) {
      setWards(
        districts[0].value.wards.map(item => ({
          label: item,
          value: item,
        })),
      );
    }
  }, [selectCity]);

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Địa chỉ'}
      />
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        contentContainerStyle={[style.form]}>
        <Text style={[FONTS.SmolBold, { marginBottom: 15 }]}>
          Nhập địa chỉ người {type === 'from_address' ? 'gửi' : 'nhận'}
        </Text>

        <Select
          title="Thành phố"
          selected={selectCity}
          setSelected={handleSelectCity}
          data={cities}
        />
        <Select
          disabled={!districts && !districts.length}
          title="Quận / huyện"
          selected={selectDistrict}
          setSelected={handleSelectDistrict}
          data={districts}
        />
        <Select
          disabled={!wards && !wards.length}
          title="Phường / xã"
          selected={selectWard}
          setSelected={setSelectWard}
          data={wards}
        />
        <TextField
          title="Tên đường, số nhà"
          value={formik.values.street}
          error={formik.touched.street && formik.errors.street}
          errorMessage={formik.errors.street}
          onBlur={() => formik.setFieldTouched('street')}
          onChangeText={text => formik.setFieldValue('street', text)}
        />
        <PrimaryButton
          title="Tiếp tục"
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
