import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BeforeSignUp, ForgotPassword, LoginSignup, Onboarding, OTPScreen} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BeforeSignUp" component={BeforeSignUp} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
