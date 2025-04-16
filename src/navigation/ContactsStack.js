import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Contacts,
  Chat,
  ViewSellerProfile,
  ViewCustomerProfile,
} from '../screens';

const Stack = createNativeStackNavigator();

const ContactsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="ViewSellerProfile" component={ViewSellerProfile} />
      <Stack.Screen
        name="ViewCustomerProfile"
        component={ViewCustomerProfile}
      />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ContactsStack;
