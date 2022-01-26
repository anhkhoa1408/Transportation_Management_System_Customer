import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { COLORS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger } from '../../styles/color';
import { saveInfo } from '../../actions/actions';
import background from './../../assets/images/background.png';
import bg from './../../assets/images/bg.png';
import Loading from './../../components/Loading';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setFocus] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: Bonk.object({
      email: Bonk.string().required('Thông tin bắt buộc'),
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    setLoading(true);
    authApi
      .login({
        identifier: values.email,
        password: values.password,
      })
      .then(data => {
        dispatch(saveInfo(data));
        setLoading(false);
      })
      .catch(err => alert('Username or password incorrect!'));
  };

  // useEffect(() => {
  //   function handleBackButton() {
  //     // navigation.navigate('register-phone');
  //     // return true;
  //     console.log(1);
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackButton,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            resizeMode="cover"
            style={styles.background}
            source={bg}>
            {!isFocus && (
              <Text
                style={{
                  fontSize: 45,
                  alignSelf: 'flex-start',
                  marginBottom: 20,
                  alignSelf: 'flex-start',
                  marginLeft: '5%',
                }}>
                Xin chào
              </Text>
            )}
            <View style={{ ...styles.form, ...isFocus }}>
              <TextField
                icon="person-outline"
                placeholder="Tên đăng nhập"
                value={formik.values.email}
                onChangeText={setEmail}
              />

              {formik.touched.email && formik.errors.email ? (
                <Text
                  style={{
                    color: danger,
                    marginBottom: 15,
                    fontWeight: 'bold',
                  }}>
                  {formik.errors.email}
                </Text>
              ) : null}

              <TextField
                icon="https"
                placeholder="Mật khẩu"
                value={formik.values.password}
                secureTextEntry
                onChangeText={setPassword}
              />

              {formik.touched.password && formik.errors.password ? (
                <Text
                  style={{
                    color: danger,
                    marginBottom: 15,
                    fontWeight: 'bold',
                  }}>
                  {formik.errors.password}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={formik.submitForm}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.container1]}>
                <Text>Chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={{ color: COLORS.primary }}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      )}
    </>
  );
};

export default SignIn;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 35,
    height: 50,
  },
  forgot: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  background: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 25,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 30,
  },
});
