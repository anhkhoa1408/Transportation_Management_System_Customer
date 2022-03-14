import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Bonk from 'yup';
import templateApi from '../../../api/templateApi';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import { COLORS, FONTS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';
import Loading from './../../../components/Loading';
import ModalMess from './../../../components/ModalMess';
import { joinAddress, simplifyString } from './../../../utils/address.js';

const EditOrderInfo = ({ navigation, route }) => {
  const [from_address, setFrom] = useState(route?.params?.item?.from_address);
  const [to_address, setTo] = useState(route?.params?.item?.to_address);

  const [item, setItem] = useState(
    route?.params?.item || {
      name: '',
      receiver_name: '',
      receiver_phone: '',
    },
  );

  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: item,
    validationSchema: Bonk.object({
      receiver_name: Bonk.string().required('Bạn cần nhập tên người nhận'),
      receiver_phone: Bonk.string().required(
        'Bạn cần nhập số điện thoại người nhận',
      ),
    }),
    onSubmit: values => handleSubmit(values),
  });

  useEffect(() => {
    if (route?.params?.item?.from_address || route?.params?.item?.to_address) {
      setFrom(route.params.item.from_address);
      setTo(route.params.item.to_address);
    }
  }, [route]);

  const handleSubmit = values => {
    let apiFuc =
      route?.params?.action === 'add'
        ? templateApi.createOrder
        : templateApi.updateOrder;

    setLoading(<Loading />);
    let data = {
      ...item,
      name: values.name,
      receiver_name: values.receiver_name,
      receiver_phone: values.receiver_phone,
      from_address: {
        ...item.from_address,
        ...from_address,
      },
      to_address: {
        ...item.to_address,
        ...to_address,
      },
    };

    if (route?.params?.action === 'add') {
      apiFuc(data)
        .then(response => {
          setLoading(null);
          setAlert({
            type: 'success',
            message: 'Thêm mẫu thành công',
          });
          setItem(response);
        })
        .catch(error => {
          setLoading(null);
          setAlert({
            type: 'danger',
            message: 'Thêm mẫu thất bại',
          });
        });
    } else {
      apiFuc(item.id, data)
        .then(response => {
          setLoading(null);
          setAlert({
            type: 'success',
            message: 'Cập nhật thành công',
          });
          setItem(response);
        })
        .catch(error => {
          setLoading(null);
          setAlert({
            type: 'error',
            message: 'Cập nhật thất bại',
          });
        });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      {loading}
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Mẫu đơn hàng'}
        rightElement={
          <Icon
            name="check"
            size={30}
            color={COLORS.primary}
            onPress={formik.submitForm}
          />
        }
      />
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        contentContainerStyle={style.form}>
        <Text style={[FONTS.BigBold, { marginBottom: 10 }]}>
          Nhập thông tin kiện hàng
        </Text>
        <TextField
          title="Tên (không bắt buộc)"
          value={formik.values.name}
          onChangeText={text => formik.setFieldValue('name', text)}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('EditOrderAddress', {
              ...route.params,
              type: 'from_address',
            })
          }>
          <TextField
            value={
              from_address && simplifyString(joinAddress(from_address), 30)
            }
            editable={false}
            title="Nơi gửi hàng"
            placeholder="Nhấn để thêm"
            afterComponent={<ListItem.Chevron size={25} />}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('EditOrderAddress', {
              ...route.params,
              type: 'to_address',
            })
          }>
          <TextField
            value={to_address && simplifyString(joinAddress(to_address), 30)}
            editable={false}
            title="Nơi nhận hàng"
            placeholder="Nhấn để thêm"
            afterComponent={<ListItem.Chevron size={25} />}
          />
        </TouchableOpacity>
        <TextField
          title="Tên người nhận"
          value={formik.values.receiver_name}
          onChangeText={text => formik.setFieldValue('receiver_name', text)}
          onBlur={() => formik.setFieldTouched('receiver_name')}
          error={formik.touched.receiver_name && formik.errors.receiver_name}
          errorMessage={formik.errors.receiver_name}
        />
        <TextField
          title="SDT người nhận"
          keyboardType="numeric"
          value={formik.values.receiver_phone}
          onChangeText={text => formik.setFieldValue('receiver_phone', text)}
          onBlur={() => formik.setFieldTouched('receiver_phone')}
          error={formik.touched.receiver_phone && formik.errors.receiver_phone}
          errorMessage={formik.errors.receiver_phone}
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
  },
});

export default EditOrderInfo;
