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

const InputReceiver = ({ navigation, route }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      receiverName: '',
      receiverPhone: '',
    },
    validationSchema: Bonk.object({
      receiverName: Bonk.string().required('Bạn chưa nhập tên người nhận'),
      receiverPhone: Bonk.string().required(
        'Bạn chưa nhập số điện thoại người nhận',
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
        headerText={'Vận chuyển'}
      />
      <OrderStep current={0} />
      <View
        style={[style.form, { flex: 1 }]}
        contentContainerStyle={{ padding: 30, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            Nhập thông tin người nhận
          </Text>
          <TextField
            title="Tên người nhận"
            value={formik.values.receiverName}
            onBlur={() => formik.setFieldTouched('receiverName')}
            onChangeText={text => formik.setFieldValue('receiverName', text)}
            error={formik.touched.receiverName && formik.errors.receiverName}
            errorMessage={formik.errors.receiverName}
          />
          <TextField
            title="Số điện thoại"
            keyboardType="numeric"
            value={formik.values.receiverPhone}
            onBlur={() => formik.setFieldTouched('receiverPhone')}
            onChangeText={text => formik.setFieldValue('receiverPhone', text)}
            error={formik.touched.receiverPhone && formik.errors.receiverPhone}
            errorMessage={formik.errors.receiverPhone}
          />
        </View>
        <PrimaryButton
          title="Thêm kiện hàng"
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
