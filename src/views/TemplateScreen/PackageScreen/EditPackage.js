import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import { DatePicker } from '../../../components/DatePicker';
import CustomInput from '../../../components/CustomInput/CustomInput';
import PillButton from '../../../components/CustomButton/PillButton';
import Select from '../../../components/Select/Select';
import { COLORS } from '../../../styles';
import { packagesType } from '../../../utils/packagesType';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import * as Bonk from 'yup';

const EditPackage = ({ route, navigation }) => {
  const order = route?.params?.order;
  const [selected, setSelected] = useState();
  const [pack, setPack] = useState({
    name: '',
    len: '',
    width: '',
    height: '',
    weight: '',
    quantity: '',
    package_type: '',
    note: '',
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: pack,
    validationSchema: Bonk.object({
      len: Bonk.number()
        .required('Bạn chưa nhập chiều dài')
        .min(1, 'Chiều dài không hợp lệ'),
      width: Bonk.number()
        .required('Bạn chưa nhập chiều rộng')
        .min(1, 'Chiều rộng không hợp lệ'),
      height: Bonk.number()
        .required('Bạn chưa nhập chiều cao')
        .min(1, 'Chiều cao không hợp lệ'),
      weight: Bonk.number().required('Bạn chưa nhập cân nặng'),
      quantity: Bonk.number()
        .required('Bạn chưa nhập số lượng')
        .min(10, 'Khối lượng không hợp lệ'),
    }),
    onSubmit: values => {
      console.log(values);
      let temp = {
        name: values.name,
        size: {
          len: values.len,
          width: values.width,
          height: values.height,
        },
        weight: values.weight,
        quantity: values.quantity,
        package_type: selected,
      };
      navigation.navigate('InputPackage', {
        ...route.params,
        pack: temp,
      });
    },
  });

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={order ? 'Thêm kiện hàng' : 'Chỉnh sửa'}
        rightElement={
          <Icon
            name="check"
            size={30}
            color={COLORS.primary}
            onPress={formik.submitForm}
          />
        }
      />
      <KeyboardAwareScrollView enableAutomaticScroll enableOnAndroid>
        <View style={style.form}>
          <TextField
            title="Tên (không bắt buộc)"
            value={formik.values.name}
            onChangeText={text => formik.setFieldValue('name', text)}
          />
          <TextField
            title="Chiều dài"
            afterText="cm"
            keyboardType="numeric"
            value={formik.values.len}
            error={formik.touched.len && formik.errors.len}
            errorMessage={formik.errors.len}
            onBlur={() => formik.setFieldTouched('len')}
            onChangeText={text =>
              formik.setFieldValue('len', text.replace(/[^0-9]/g, ''))
            }
          />
          <TextField
            title="Chiều rộng"
            afterText="cm"
            keyboardType="numeric"
            value={formik.values.width}
            error={formik.touched.width && formik.errors.width}
            errorMessage={formik.errors.width}
            onBlur={() => formik.setFieldTouched('width')}
            onChangeText={text =>
              formik.setFieldValue('width', text.replace(/[^0-9]/g, ''))
            }
          />
          <TextField
            title="Chiều cao"
            afterText="cm"
            keyboardType="numeric"
            value={formik.values.height}
            error={formik.touched.height && formik.errors.height}
            errorMessage={formik.errors.height}
            onBlur={() => formik.setFieldTouched('height')}
            onChangeText={text =>
              formik.setFieldValue('height', text.replace(/[^0-9]/g, ''))
            }
          />
          <TextField
            title="Khối lượng"
            afterText="kg"
            keyboardType="numeric"
            value={formik.values.weight}
            error={formik.touched.weight && formik.errors.weight}
            errorMessage={formik.errors.weight}
            onBlur={() => formik.setFieldTouched('weight')}
            onChangeText={text =>
              formik.setFieldValue('weight', text.replace(/[^0-9]/g, ''))
            }
          />
          <TextField
            title="Số lượng"
            afterText="kiện"
            keyboardType="numeric"
            value={formik.values.quantity}
            error={formik.touched.quantity && formik.errors.quantity}
            errorMessage={formik.errors.quantity}
            onBlur={() => formik.setFieldTouched('quantity')}
            onChangeText={text =>
              formik.setFieldValue('quantity', text.replace(/[^0-9]/g, ''))
            }
          />
          <Select
            title="Loại hàng hoá"
            data={packagesType}
            selected={selected}
            setSelected={setSelected}
          />
          <CustomInput title="Ghi chú" />
        </View>
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
  },
});

export default EditPackage;
