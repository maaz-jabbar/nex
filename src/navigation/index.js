import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import ProfileCreationStack from './ProfileCreationStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="AppStack">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreationStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
