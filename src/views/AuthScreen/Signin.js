import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { COLORS, STYLES, FONTS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger } from '../../styles/color';
import { saveInfo } from '../../actions/actions';
import Loading from './../../components/Loading';
import ModalMess from '../../components/ModalMess';
import banner from './../../assets/images/banner_signin.jpg';
import { Icon, Image, Text, SocialIcon } from 'react-native-elements';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { socket, initChat } from '../../config/socketIO';
import { syncToken } from '../../config/cloudMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { onFacebookButtonPress, onGoogleButtonPress } from '../../config/OAuth';
import { useTranslation } from 'react-i18next';

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { t, i18n } = useTranslation("common")
  // i18n.changeLanguage("vi" hoac "en")

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: Bonk.object({
      email: Bonk.string().required(t("authScreen.requiredInformation")),
      password: Bonk.string()
        .required(t("authScreen.requiredInformation"))
        .min(8, t("authScreen.passwordMustBeAtLeast8Characters")),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  React.useEffect(() => {
    if (route.params?.token) {
      handleSubmit('phone', route.params?.token);
    }
  }, [route.params?.token]);

  const handleSubmit = (values, token) => {
    setDisabled(true);
    setLoading(<Loading />);
    let handler;
    switch (values) {
      case 'google':
        handler = onGoogleButtonPress();
        break;
      case 'facebook':
        handler = onFacebookButtonPress();
        break;
      case 'phone':
        handler = authApi.loginWithProvider('phone', token);
        break;
      default:
        handler = authApi.login({
          identifier: values.email,
          password: values.password,
        });
        break;
    }
    Keyboard.dismiss();
    handler
      .then(data => {
        dispatch(saveInfo(data));
        if (socket.disconnected) socket.connect();
        else initChat();
        syncToken();
        setLoading(null);
      })
      .catch(err => {
        try {
          const message = err.response.data.data[0].messages[0].id;
          if (message === 'Auth.form.error.email.taken')
            setAlert({
              type: 'warning',
              message: t("authScreen.emailAlreadyInUse!"),
            });
          else
            setAlert({
              type: 'warning',
              message: t("authScreen.incorrectAccountOrPassword!"),
            });
        } catch (error) {
          setAlert({
            type: 'warning',
            message: t("authScreen.authenticationFailed"),
          });
        }
        setLoading(null);
        setDisabled(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll>
        {alert && (
          <ModalMess
            type={alert.type}
            message={alert.message}
            alert={alert}
            setAlert={setAlert}
          />
        )}
        {loading}
        <Image
          source={banner}
          resizeMode="contain"
          style={{
            height: 130,
            alignSelf: 'center',
            display: 'flex',
            marginBottom: 20,
          }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text h2 style={{ marginBottom: 10 }}>
          {t("authScreen.hello")}
          </Text>
          <Text style={styles.subTitle}>
            {t("authScreen.signInToStartUsingOurService")}
          </Text>
        </View>

        <View style={{ ...styles.form }}>
          <TextField
            name="email"
            icon="person-outline"
            placeholder={t("authScreen.userName")}
            value={formik.values.email}
            onChangeText={setEmail}
            onBlur={() => {
              formik.setFieldTouched('email');
            }}
            error={formik.touched.email && formik.errors.email}
            errorMessage={formik.errors.email}
          />

          <TextField
            name="password"
            icon="https"
            placeholder={t("authScreen.password")}
            value={formik.values.password}
            secureTextEntry={!showPass}
            onChangeText={setPassword}
            onBlur={() => formik.setFieldTouched('password')}
            afterComponent={
              <Icon
                onPress={() => setShowPass(!showPass)}
                name={!showPass ? 'visibility' : 'visibility-off'}
                size={25}
                color={COLORS.primary}
              />
            }
            error={formik.touched.password && formik.errors.password}
            errorMessage={formik.errors.password}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('forgotPassword', { type: 'forgot' })
            }>
            <Text style={styles.forgot}>{t("authScreen.forgotPassword")}?</Text>
          </TouchableOpacity>
          <PrimaryButton
            title={t("authScreen.login")}
            onPress={formik.submitForm}
            disabled={disabled}
          />

          {/* For demo only */}
          {/* <PrimaryButton
            title={t("login")}
            onPress={() => i18n.changeLanguage(i18n.language === "en" ? "vi" : "en")}
            disabled={disabled}
          /> */}
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            flex: 1,
          }}>
          <Text style={styles.subTitle}>{t("authScreen.orLoginWith")}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity onPress={() => handleSubmit('google')}>
              <Icon
                name="google"
                type="font-awesome"
                color="#4285F4"
                containerStyle={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSubmit('facebook')}>
              <Icon
                name="facebook"
                type="font-awesome"
                color="#4267B2"
                containerStyle={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('forgotPassword', { type: 'signin' })
              }>
              <Icon
                name="phone"
                type="font-awesome"
                color={COLORS.warning}
                containerStyle={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.container1]}>
          <Text style={[FONTS.Medium]}>{t("authScreen.doNotHaveAnAccount")}? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ ...FONTS.BigBold, color: COLORS.primary }}>
              {t("authScreen.registration")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
    paddingVertical: 25,
  },
  container1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 15,
    marginTop: 15
  },
  forgot: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  form: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    elevation: 15,
    shadowColor: COLORS.primary,
    marginHorizontal: 8,
  },
  subTitle: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 10,
  },
});
