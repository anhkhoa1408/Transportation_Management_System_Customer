import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../views/AuthScreen/Signin';
import SignUp from '../../views/AuthScreen/Signup';
import ForgotPass from '../../views/AuthScreen/ForgotPass';
import InputOtp from '../../views/AuthScreen/InputOtp';
import ResetPass from '../../views/AuthScreen/ResetPass';

const authStack = createStackNavigator();

const AuthStack = () => {
  return (
    <authStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="Signin">
      <authStack.Screen name="Signin" component={SignIn} />
      <authStack.Screen name="Signup" component={SignUp} />
      <authStack.Screen name="forgotPassword" component={ForgotPass} />
      <authStack.Screen name="inputOtp" component={InputOtp} />
      <authStack.Screen name="resetPass" component={ResetPass} />
    </authStack.Navigator>
  );
};

export default AuthStack;
