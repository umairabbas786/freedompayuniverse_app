import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/auth/Login/login';
import ResetPassword from '../../screens/auth/resetPassword/resetPassword';
import Signup from '../../screens/auth/Signup/signup';
import VerifyOtp from '../../screens/auth/verifyOtp/verifyOtp';
import Splash from '../../screens/splash/splash';
import ForgetPassword from '../../screens/auth/forgetPassword/forgetPassword';
import VerifyPhoneOtp from '../../screens/auth/verifyPhoneOtp/verifyPhoneOtp';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerifyPhoneOtp" component={VerifyPhoneOtp} />
    </Stack.Navigator>
  );
};
export default AuthStack;
