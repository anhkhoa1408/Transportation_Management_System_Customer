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

const EditPackage = ({ route, navigation }) => {
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
        .required('Bạn chưa nhập chiều dài')
        .min(0, 'Chiều dài không hợp lệ'),
      width: Bonk.number()
        .required('Bạn chưa nhập chiều rộng')
        .min(0, 'Chiều rộng không hợp lệ'),
      height: Bonk.number()
        .required('Bạn chưa nhập chiều cao')
        .min(0, 'Chiều cao không hợp lệ'),
      weight: Bonk.number()
        .required('Bạn chưa nhập khối lượng')
        .min(0, 'Khối lượng không hợp lệ'),
      quantity: Bonk.number()
        .required('Bạn chưa nhập số lượng')
        .min(1, 'Khối lượng không hợp lệ'),
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
          message: 'Cập nhật thành công',
        });
      })
      .catch(error => {
        setLoading(null);
        setAlert({
          type: 'danger',
          message: 'Cập nhật thất bại',
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
          message: 'Thêm mẫu thành công',
        });
      })
      .catch(error => {
        setLoading(null);
        setAlert({
          type: 'danger',
          message: 'Thêm mẫu thất bại',
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
            value={formik.values.len.toString()}
            error={formik.touched.len && formik.errors.len}
            errorMessage={formik.errors.len}
            onBlur={() => formik.setFieldTouched('len')}
            onChangeText={text =>
              formik.setFieldValue('len', text.replace(/[^0-9.]/g, ''))
            }
          />
          <TextField
            title="Chiều rộng"
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
            title="Chiều cao"
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
            title="Khối lượng"
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
            title="Số lượng"
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
