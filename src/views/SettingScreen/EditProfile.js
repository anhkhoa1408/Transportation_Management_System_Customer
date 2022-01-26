import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../../styles';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { CLEAN_STORE } from '../../constants/types';
import { store } from '../../config/configureStore';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import { saveInfo } from '../../actions/actions';
import ModalMess from '../../components/ModalMess';
import { danger, success } from '../../styles/color';
import { Avatar, Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import PillButton from '../../components/CustomButton/PillButton';
import Loading from '../../components/Loading';

const EditProfile = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [avatar, setAvatar] = useState(
    'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
  );
  const [dataChange, setDataChange] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = store.getState();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      name: Bonk.string().required('Thông tin bắt buộc'),
      email: Bonk.string()
        .required('Thông tin bắt buộc')
        .email('Email không hợp lệ'),
      phone: Bonk.string().required('Thông tin bắt buộc'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUser(userInfo);
      setData({
        ...data,
        name: userInfo.user.name,
        email: userInfo.user.email,
        phone: userInfo.user.phone,
      });
      if ('avatar' in userInfo.user)
        if ('url' in userInfo.user.avatar) setAvatar(userInfo.user.avatar.url);
      setDataChange(false);
      setDataChange(true);
    });
    return unsubscribe;
  }, [navigation]);

  const handleSubmit = values => {
    setLoading(true);
    authApi
      .update(user.user.id, values)
      .then(response => {
        setLoading(false);
        dispatch(saveInfo({ user: response }));
        setAlert({
          type: 'success',
          message: 'Cập nhật thông tin thành công',
        });
      })
      .catch(err => {
        setLoading(false);
        setAlert({
          type: 'error',
          message: 'Cập nhật thông tin thất bại',
        });
      });
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
        headerText="Thông tin cá nhân"
      />

      <ScrollView contentContainerStyle={{ padding: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Avatar
            size={150}
            source={{
              uri: avatar,
            }}
            rounded>
            <Avatar.Accessory
              underlayColor="#CCC"
              style={{ backgroundColor: COLORS.primary }}
              color={COLORS.white}
              size={35}
            />
          </Avatar>
        </View>

        <TextField
          title="Tên"
          style={styles.fsize}
          onChangeText={text => {
            formik.setFieldValue('name', text);
          }}
          value={formik.values.name}
        />

        {formik.touched.name && formik.errors.name ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.name}
          </Text>
        ) : null}

        <TextField
          title="Email"
          style={styles.fsize}
          value={formik.values.email}
          onChangeText={text => formik.setFieldValue('email', text)}
        />

        {formik.touched.email && formik.errors.email ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.email}
          </Text>
        ) : null}

        <TextField
          keyboardType="numeric"
          title="Số điện thoại"
          style={styles.fsize}
          value={formik.values.phone}
          onChangeText={text => formik.setFieldValue('phone', text)}
        />

        {formik.touched.phone && formik.errors.phone ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.phone}
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

export default EditProfile;

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
