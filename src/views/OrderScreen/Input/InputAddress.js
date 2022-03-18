import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Bonk from 'yup';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import Header from '../../../components/Header';
import Select from '../../../components/Select/Select';
import TextField from '../../../components/TextField';
import { provinces } from '../../../constants/province';
import { FONTS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';

const InputAddress = ({ navigation, route, ...props }) => {
  const { type } = route?.params;

  const initializeAddress = useMemo(() => {
    let cities = provinces.map(item => ({
      label: item.name,
      value: item,
    }));

    let selectCity = (
      cities.find(city => city.label === route?.params[type]?.city) || cities[0]
    ).value;

    let districts =
      selectCity &&
      selectCity.districts.map(item => ({
        label: item.name,
        value: item,
      }));

    let selectDistrict =
      districts &&
      (
        districts.find(
          district => district.label === route?.params[type]?.province,
        ) || districts[0]
      ).value;

    let wards =
      selectDistrict &&
      selectDistrict.wards.map(item => ({
        label: item,
        value: item,
      }));

    let selectWard =
      wards &&
      (
        wards.find(ward => {
          return ward.label === route?.params[type]?.ward;
        }) || wards[0]
      ).value;

    return {
      cities,
      selectCity,
      districts,
      selectDistrict,
      wards,
      selectWard,
    };
  }, [route.params]);

  const [cities, setCities] = useState(initializeAddress.cities);
  const [selectCity, setSelectCity] = useState(
    initializeAddress.selectCity || {
      label: '',
      value: '',
    },
  );

  const [districts, setDistricts] = useState(initializeAddress.districts || []);
  const [selectDistrict, setSelectDistrict] = useState(
    initializeAddress.selectDistrict || {
      label: '',
      value: '',
    },
  );

  const [wards, setWards] = useState(initializeAddress.wards || []);
  const [selectWard, setSelectWard] = useState(
    initializeAddress.selectWard || {
      label: '',
      value: '',
    },
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      street: route?.params[type]?.street || '',
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
        ward: selectWard.label || initializeAddress.selectCity.name,
        province: selectDistrict.label || initializeAddress.selectDistrict.name,
        city: selectCity.name || initializeAddress.selectWard,
      },
    });
  };

  const handleSelectCity = city => {
    setSelectCity(city);
  };

  const handleSelectDistrict = district => {
    setSelectDistrict({
      label: district.name,
      value: district,
    });
  };

  const handleSelectWard = ward => {
    setSelectWard({
      label: ward,
      value: ward,
    });
  };

  useEffect(() => {
    if (selectCity.name !== initializeAddress?.selectCity?.name) {
      let districts = selectCity.districts.map(item => ({
        label: item.name,
        value: item,
      }));
      setDistricts(districts);
      setSelectDistrict(districts[0]);
    }
  }, [selectCity]);

  useEffect(() => {
    if (selectDistrict.name !== initializeAddress?.selectDistrict?.name) {
      let wards = selectDistrict.value.wards.map(item => ({
        label: item,
        value: item,
      }));
      setWards(wards);
      setSelectWard(wards[0]);
    }
  }, [selectDistrict]);

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
          setSelected={handleSelectWard}
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
