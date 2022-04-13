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
import { useTranslation } from 'react-i18next';

const EditOrderInfo = ({ navigation, route }) => {
  const { t, i18n } = useTranslation("common")
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
      receiver_name: Bonk.string().required(t("templateScreen.youNeedToEnterTheReceiver'sName")),
      receiver_phone: Bonk.string().required(
        t("templateScreen.youNeedToEnterTheReceiver'sPhoneNumber"),
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
            message: t("templateScreen.successfullyAddTemplate"),
          });
          setItem(response);
          navigation.goBack()
        })
        .catch(error => {
          setLoading(null);
          setAlert({
            type: 'danger',
            message: t("templateScreen.failureAddedTemplate"),
          });
        });
    } else {
      apiFuc(item.id, data)
        .then(response => {
          setLoading(null);
          setAlert({
            type: 'success',
            message: t("templateScreen.updateSuccessful"),
          });
          setItem(response);
        })
        .catch(error => {
          setLoading(null);
          setAlert({
            type: 'error',
            message: t("templateScreen.updateFailure"),
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
        headerText={t("templateScreen.orderForm")}
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
          {t("templateScreen.enterPackageInformation")}
        </Text>
        <TextField
          title={t("templateScreen.name(optional)")}
          value={formik.values.name}
          onChangeText={text => formik.setFieldValue('name', text)}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('InputAddress', {
              ...route.params,
              type: 'from_address',
              previousScreen: 'EditOrderInfo',
            })
          }>
          <TextField
            value={
              from_address && simplifyString(joinAddress(from_address), 30)
            }
            editable={false}
            title={t("templateScreen.placeOfDelivery")}
            placeholder={t("templateScreen.tapToAdd")}
            afterComponent={<ListItem.Chevron size={25} />}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('InputAddress', {
              ...route.params,
              type: 'to_address',
              previousScreen: 'EditOrderInfo',
            })
          }>
          <TextField
            value={to_address && simplifyString(joinAddress(to_address), 30)}
            editable={false}
            title={t("templateScreen.placeOfDelivery")}
            placeholder={t("templateScreen.tapToAdd")}
            afterComponent={<ListItem.Chevron size={25} />}
          />
        </TouchableOpacity>
        <TextField
          title={t("templateScreen.receiver'sName")}
          value={formik.values.receiver_name}
          onChangeText={text => formik.setFieldValue('receiver_name', text)}
          onBlur={() => formik.setFieldTouched('receiver_name')}
          error={formik.touched.receiver_name && formik.errors.receiver_name}
          errorMessage={formik.errors.receiver_name}
        />
        <TextField
          title={t("templateScreen.receiver'sPhone")}
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
