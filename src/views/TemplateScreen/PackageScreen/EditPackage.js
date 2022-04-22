import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Bonk from 'yup';
import templateApi from '../../../api/templateApi';
import CustomInput from '../../../components/CustomInput/CustomInput';
import Header from '../../../components/Header';
import Select from '../../../components/Select/Select';
import TextField from '../../../components/TextField';
import { packagesType } from '../../../constants/packagesType';
import { COLORS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';
import ModalMess from './../../../components/ModalMess';
import Loading from './../../../components/Loading';
import { useTranslation } from 'react-i18next';

const EditPackage = ({ route, navigation }) => {
  const { t, i18n } = useTranslation("common")
  const order = route?.params?.order;
  const item = route?.params?.item;
  const type = route?.params?.type;
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selected, setSelected] = useState(item?.package_type || 'normal');
  const [pack, setPack] = useState(
    (item && {
      ...item,
      len: item.size.len,
      width: item.size.width,
      height: item.size.height,
      weight: item.weight,
      quantity: item.quantity,
    }) || {
      name: '',
      len: '',
      width: '',
      height: '',
      weight: '',
      quantity: '',
      package_type: '',
      note: '',
    },
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...pack,
    },
    validationSchema: Bonk.object({
      len: Bonk.number()
        .required(t("templateScreen.youHaveNotEnteredTheLength"))
        .min(0, t("templateScreen.invalidLength")),
      width: Bonk.number()
        .required(t("templateScreen.youHaveNotEnteredTheWidth"))
        .min(0, t("templateScreen.invalidWidth")),
      height: Bonk.number()
        .required(t("templateScreen.youHaveNotEnteredYourHeight"))
        .min(0, t("templateScreen.invalidHeight")),
      weight: Bonk.number()
        .required(t("templateScreen.youHaveNotEnteredTheVolume"))
        .min(0, t("templateScreen.invalidVolume")),
      quantity: Bonk.number()
        .required(t("templateScreen.youDidNotEnterANumber"))
        .min(1, t("templateScreen.invalidQuantity")),
    }),
    onSubmit: values => {
      if (type === 'edit') handleEdit(values);
      else if (type === 'add') handleCreate(values);
      else if (order) {
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
      }
    },
  });

  const handleEdit = values => {
    setLoading(<Loading />);
    let data = {
      name: values.name,
      len: values.len,
      width: values.width,
      height: values.height,
      weight: values.weight,
      quantity: values.quantity,
      package_type: selected,
      size: item.size,
    };

    templateApi
      .updatePackage(item.id, data)
      .then(response => {
        setLoading(null);
        setAlert({
          type: 'success',
          message: t("templateScreen.updateSuccessful"),
        });
      })
      .catch(error => {
        setLoading(null);
        setAlert({
          type: 'danger',
          message: t("templateScreen.updateFailure"),
        });
      });
  };

  const handleCreate = values => {
    setLoading(<Loading />);
    let data = {
      name: values.name,
      len: values.len,
      width: values.width,
      height: values.height,
      weight: values.weight,
      quantity: values.quantity,
      package_type: selected,
    };

    templateApi
      .createPackage(data)
      .then(response => {
        setLoading(null);
        setAlert({
          type: 'success',
          message: t("templateScreen.successfullyAddTemplate"),
        });
        navigation.goBack()
      })
      .catch(error => {
        setLoading(null);
        setAlert({
          type: 'danger',
          message: t("templateScreen.failureAddedTemplate"),
        });
      });
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
        headerText={order ? t("templateScreen.addPackages") : t("templateScreen.edit")}
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
            title={t("templateScreen.name(optional)")}
            value={formik.values.name}
            onChangeText={text => formik.setFieldValue('name', text)}
          />
          <TextField
            title={t("templateScreen.length")}
            afterText="cm"
            keyboardType="numeric"
            value={formik.values.len.toString()}
            error={formik.touched.len && formik.errors.len}
            errorMessage={formik.errors.len}
            onBlur={() => formik.setFieldTouched('len')}
            onChangeText={text =>
              formik.setFieldValue('len', text.replace(/[^0-9.]/g, ''))
            }
          />
          <TextField
            title={t("templateScreen.width")}
            afterText="cm"
            keyboardType="numeric"
            value={formik.values.width.toString()}
            error={formik.touched.width && formik.errors.width}
            errorMessage={formik.errors.width}
            onBlur={() => formik.setFieldTouched('width')}
            onChangeText={text =>
              formik.setFieldValue('width', text.replace(/[^0-9.]/g, ''))
            }
          />
          <TextField
            title={t("templateScreen.height")}
            afterText="cm"
            keyboardType="numeric"
            value={formik.values.height.toString()}
            error={formik.touched.height && formik.errors.height}
            errorMessage={formik.errors.height}
            onBlur={() => formik.setFieldTouched('height')}
            onChangeText={text =>
              formik.setFieldValue('height', text.replace(/[^0-9.]/g, ''))
            }
          />
          <TextField
            title={t("templateScreen.weight")}
            afterText="kg"
            keyboardType="numeric"
            value={formik.values.weight.toString()}
            error={formik.touched.weight && formik.errors.weight}
            errorMessage={formik.errors.weight}
            onBlur={() => formik.setFieldTouched('weight')}
            onChangeText={text =>
              formik.setFieldValue('weight', text.replace(/[^0-9.]/g, ''))
            }
          />
          <TextField
            title={t("templateScreen.quantity")}
            afterText="kiện"
            keyboardType="numeric"
            value={formik.values.quantity.toString()}
            error={formik.touched.quantity && formik.errors.quantity}
            errorMessage={formik.errors.quantity}
            onBlur={() => formik.setFieldTouched('quantity')}
            onChangeText={text =>
              formik.setFieldValue('quantity', text.replace(/[^0-9]/g, ''))
            }
          />
          <Select
            title={t("templateScreen.typeOfGoods")}
            data={packagesType}
            selected={selected}
            setSelected={setSelected}
          />
          {/* <CustomInput title={t("templateScreen.note")} /> */}
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
