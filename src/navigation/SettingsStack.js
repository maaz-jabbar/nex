import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CustomerEditProfile,
  CustomerProfile,
  SellerProfile,
  SellerEditProfile,
} from '../screens';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  const [initialRouteName, setInitialRouteName] = React.useState(null);
  const userType = useSelector(state => state.user?.userType);
  useEffect(() => {
    if (userType === 'CUSTOMER') {
      setInitialRouteName('CustomerProfile');
    } else {
      setInitialRouteName('SellerProfile');
    }
  });
  if (!initialRouteName) return null;
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
      <Stack.Screen
        name="CustomerEditProfile"
        component={CustomerEditProfile}
      />
      <Stack.Screen name="SellerProfile" component={SellerProfile} />
      <Stack.Screen name="SellerEditProfile" component={SellerEditProfile} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
