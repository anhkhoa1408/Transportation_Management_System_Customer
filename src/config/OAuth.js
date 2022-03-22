import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import authApi from '../api/authApi';

export async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const { accessToken } = await AccessToken.getCurrentAccessToken();

  if (!accessToken) {
    throw 'Something went wrong obtaining access token';
  }

  return authApi.loginWithProvider('facebook', accessToken);
}

export async function onGoogleButtonPress() {
  GoogleSignin.configure({
    webClientId:
      '874335421915-b75jajngfosuoeh59hfg91qv8kt493lt.apps.googleusercontent.com',
  });
  await GoogleSignin.signIn();
  const { accessToken } = await GoogleSignin.getTokens();
  if (!accessToken) {
    throw 'Something went wrong obtaining access token';
  }
  return authApi.loginWithProvider('google', accessToken);
}

export async function getPhoneNumberVerificator(phoneNumber) {
  return await auth().signInWithPhoneNumber(phoneNumber);
}

export async function getPhoneToken(confirm, code) {
  try {
    const data = await confirm.confirm(code);
    return await data.user.getIdToken();
  } catch (error) {
    throw 'Invalid code.';
  }
}
