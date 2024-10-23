import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BeforeSignUp, Onboarding} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BeforeSignUp" component={BeforeSignUp} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default AuthStack;
