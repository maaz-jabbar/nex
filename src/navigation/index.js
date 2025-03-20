import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './AuthStack';
import ProfileCreationStack from './ProfileCreationStack';
import AppStack from './AppStack';
import CustomerProfileCreationStack from './CustomerProfileCreationStack';
import {setTopLevelNavigator} from './navigationService';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const rememberMe = useSelector(state => state.user?.rememberMe);
  const user = useSelector(state => state.user?.user);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setReady(true);
    }, 3000);
  }, []);
  const [ready, setReady] = React.useState(false);

  if (!ready) return null;
  return (
    <NavigationContainer
      ref={navigationRef => setTopLevelNavigator(navigationRef)}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={user && rememberMe ? 'AppStack' : 'Auth'}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreationStack} />
        <Stack.Screen
          name="CustomerProfileCreation"
          component={CustomerProfileCreationStack}
        />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
