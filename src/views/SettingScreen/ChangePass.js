import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Bonk from 'yup';
import PillButton from '../../components/CustomButton/PillButton';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ModalMess from '../../components/ModalMess';
import TextField from '../../components/TextField';
import { store } from '../../config/configureStore';
import { COLORS } from '../../styles';
import { danger, success } from '../../styles/color';

const ChangePass = ({ navigation }) => {
  const [data, setData] = useState({
    currPass: '',
    password: '',
    confirmPassword: '',
  });

  const { userInfo } = store.getState();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      currPass: Bonk.string().required('Thông tin bắt buộc'),
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'Mật khẩu không hợp lệ')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
      confirmPassword: Bonk.string()
        .required('Thông tin bắt buộc')
        .oneOf(
          [Bonk.ref('password'), null],
          'Mật khẩu và xác nhận mật khẩu không khớp',
        )
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setUser(userInfo);
  //     setData({
  //       ...data,
  //       name: userInfo.user.name,
  //       email: userInfo.user.email,
  //     });
  //     if ('avatar' in userInfo.user)
  //       if ('url' in userInfo.user.avatar) setAvatar(userInfo.user.avatar.url);
  //     setDataChange(false);
  //     setDataChange(true);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const handleSubmit = values => {
    // setLoading(true);
    // let { name, email } = values;
    // let data = {
    //   name: name,
    //   email: email,
    // };
    // authApi
    //   .update(user.user.id, data)
    //   .then(response => {
    //     setLoading(false);
    //     dispatch(saveInfo(user));
    //     setAlert({
    //       type: 'success',
    //       message: 'Cập nhật thông tin thành công',
    //     });
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setAlert({
    //       type: 'error',
    //       message: 'Cập nhật thông tin thất bại',
    //     });
    //   });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          setAlert={setAlert}
          alert={alert}
        />
      )}
      {loading && <Loading />}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText="Đổi mật khẩu"
      />

      <ScrollView contentContainerStyle={{ padding: 25 }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 25,
          }}>
          Mật khẩu mới phải tối thiểu 8 ký tự, bao gồm chữ in hoa, số và khác
          với mật khẩu hiện tại
        </Text>

        <TextField
          title="Mật khẩu hiện tại"
          style={styles.fsize}
          value={formik.values.currPass}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('currPass', text)}
        />

        {formik.touched.currPass && formik.errors.currPass ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.currPass}
          </Text>
        ) : null}

        <TextField
          title="Mật khẩu mới"
          style={styles.fsize}
          value={formik.values.password}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('password', text)}
        />

        {formik.touched.password && formik.errors.password ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.password}
          </Text>
        ) : null}

        <TextField
          title="Xác nhận mật khẩu"
          style={styles.fsize}
          value={formik.values.confirmPassword}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
        />

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.confirmPassword}
          </Text>
        ) : null}

        <PillButton
          title="Cập nhật"
          buttonStyle={{ backgroundColor: success }}
          onPress={formik.submitForm}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
