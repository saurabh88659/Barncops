import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreens from '../screens/AuthStackScreens/SplashScreens';
import SignUpScreen from '../screens/AuthStackScreens/SignUpScreen';
import LoginScreens from '../screens/AuthStackScreens/LoginScreens';
import HomeScreen from '../screens/mainStackScreens/HomeScreen';
import ElectionOveviewScreen from '../screens/mainStackScreens/ElectionOveviewScreen';
import {routes} from './routes';
import OtpVerificationScreen from '../screens/AuthStackScreens/OtpVerificationScreen';
import SendOTPScreen from '../screens/AuthStackScreens/SendOTPScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={routes.Splash_Screens}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.Splash_Screens} component={SplashScreens} />
      {/* <Stack.Screen name={routes.Login_Screens} component={LoginScreens} /> */}
      <Stack.Screen
        name={routes.OtpVerification_Screen}
        component={OtpVerificationScreen}
      />
      {/* <Stack.Screen name={routes.SignUp_Screen} component={SignUpScreen} /> */}
      <Stack.Screen name={routes.Send_OTP_Screen} component={SendOTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
