import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { saveInfo } from '../../actions/actions';
import authApi from '../../api/authApi';
import PillButton from '../../components/CustomButton/PillButton';
import { DatePicker } from '../../components/DatePicker';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ModalMess from '../../components/ModalMess';
import TextField from '../../components/TextField';
import { store } from '../../config/configureStore';
import { COLORS } from '../../styles';
import { danger, success } from '../../styles/color';
import { useTranslation } from 'react-i18next';

const EditProfile = ({ navigation }) => {
  const { t, i18n } = useTranslation("common")
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '183/14 Bui Vien',
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
      name: Bonk.string().required(t("settingScreen.requiredInformation")),
      email: Bonk.string()
        .required(t("settingScreen.requiredInformation"))
        .email(t("settingScreen.invalidEmail")),
      phone: Bonk.string().required(t("settingScreen.requiredInformation")),
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
          message: t("settingScreen.successfullyUpdated"),
        });
      })
      .catch(err => {
        setLoading(false);
        setAlert({
          type: 'error',
          message: t("settingScreen.updateFailedInformation"),
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
        headerText={t("settingScreen.personalInformation")}
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
          title={t("settingScreen.name")}
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
          title={t("settingScreen.phoneNumber")}
          style={styles.fsize}
          value={formik.values.phone}
          onChangeText={text => formik.setFieldValue('phone', text)}
        />

        {formik.touched.phone && formik.errors.phone ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.phone}
          </Text>
        ) : null}

        <DatePicker title={t("settingScreen.yourBirthday")} />

        <TextField
          title={t("settingScreen.address")}
          style={styles.fsize}
          value={formik.values.address}
          onChangeText={text => formik.setFieldValue('address', text)}
        />
      </ScrollView>
      <View style={{ padding: 20 }}>
        <PillButton
          title={t("settingScreen.update")}
          buttonStyle={{ backgroundColor: success }}
          onPress={formik.submitForm}
        />
      </View>
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
