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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { MAIN_URL } from '../../api/config';
import { launchImageLibrary } from 'react-native-image-picker';
import { getAvatarFromUser, getNameFromUser } from '../../utils/avatarUltis';


const EditProfile = ({ navigation }) => {
  const { t, i18n } = useTranslation("common")
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      ward: '',
      province: '',
      city: '',
    },
  });
  const [dataChange, setDataChange] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = store.getState();
  const [avatar, setAvatar] = useState(getAvatarFromUser(userInfo?.user));
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      street: data.address.street,
      ward: data.address.ward,
      province: data.address.province,
      city: data.address.city,
    },
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
      setData(userInfo.user);
      setDataChange(false);
      setDataChange(true);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = values => {
    setLoading(true);
    let data = {
      ...values,
      address: {
        ...values.address,
        street: values.street,
        ward: values.ward,
        province: values.province,
        city: values.city,
      },
    };
    authApi
      .update(user.user.id, data)
      .then(response => {
        setLoading(false);
        dispatch(saveInfo({ user: response }));
        setData(response);
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

  // console.log(formik.values.birthday)

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

      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        contentContainerStyle={{ paddingHorizontal: 25 }}>
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
              onPress={() =>
                launchImageLibrary({
                  mediaTypes: 'photo',
                  quality: 1,
                }).then(data => {
                  if (data.assets && data.assets.length > 0) {
                    setLoading(true);
                    authApi
                      .updateAvatar(data.assets[0])
                      .then(response => {
                        setLoading(false);
                        dispatch(saveInfo({ user: response }));
                        setAlert({
                          type: 'success',
                          message: 'Cập nhật ảnh đại diện thành công',
                        });
                        setAvatar(MAIN_URL + response.avatar.url);
                      })
                      .catch(err => {
                        console.error(err);
                        setLoading(false);
                        setAlert({
                          type: 'danger',
                          message: 'Cập nhật ảnh đại diện thất bại',
                        });
                      });
                  }
                })
              }
            />
          </Avatar>
        </View>

        <TextField
          title={t("settingScreen.name")}
          onChangeText={text => {
            formik.setFieldValue('name', text);
          }}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
          errorMessage={formik.errors.name}
          onBlur={() => formik.setFieldTouched('name')}
        />

        <TextField
          title="Email"
          value={formik.values.email}
          onChangeText={text => formik.setFieldValue('email', text)}
          error={formik.touched.email && formik.errors.email}
          errorMessage={formik.errors.email}
          onBlur={() => formik.setFieldTouched('email')}
        />

        <TextField
          keyboardType="numeric"
          title={t("settingScreen.phoneNumber")}
          value={formik.values.phone}
          onChangeText={text => formik.setFieldValue('phone', text)}
          error={formik.touched.phone && formik.errors.phone}
          errorMessage={formik.errors.phone}
          onBlur={() => formik.setFieldTouched('phone')}
        />



        {formik.values.birthday && (
          <DatePicker
            title={t("settingScreen.yourBirthday")}
            date={formik.values.birthday}
            setDate={date => formik.setFieldValue('birthday', date)}
          />
        )}

        <TextField
          title={t("orderScreen.street")}
          value={formik.values.street}
          onChangeText={text => formik.setFieldValue('address', text)}
          error={formik.touched.street && formik.errors.street}
          errorMessage={formik.errors.street}
          onBlur={() => formik.setFieldTouched('street')}
        />
        <TextField
          title={t("orderScreen.wards")}
          value={formik.values.ward}
          onChangeText={text => formik.setFieldValue('ward', text)}
          error={formik.touched.ward && formik.errors.ward}
          errorMessage={formik.errors.ward}
          onBlur={() => formik.setFieldTouched('ward')}
        />
        
        <TextField
          title={t("orderScreen.province")}
          value={formik.values.province}
          onChangeText={text => formik.setFieldValue('province', text)}
          error={formik.touched.province && formik.errors.province}
          errorMessage={formik.errors.province}
          onBlur={() => formik.setFieldTouched('province')}
        />
        <TextField
          title={t("orderScreen.city")}
          value={formik.values.city}
          onChangeText={text => formik.setFieldValue('city', text)}
          error={formik.touched.city && formik.errors.city}
          errorMessage={formik.errors.city}
          onBlur={() => formik.setFieldTouched('city')}
        />

        <PrimaryButton
          title="Cập nhật"
          backgroundColor={COLORS.success}
          onPress={formik.submitForm}></PrimaryButton>
      </KeyboardAwareScrollView>
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
