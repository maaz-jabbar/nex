import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChatLanding,
  Contacts,
  Chat,
  SelectContacts,
  BroadcastForm,
  ViewSellerProfile,
  ViewCustomerProfile,
  GalleryPhotoView,
} from '../screens';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatLanding" component={ChatLanding} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="GalleryPhotoView" component={GalleryPhotoView} />
      <Stack.Screen name="SelectContacts" component={SelectContacts} />
      <Stack.Screen name="BroadcastForm" component={BroadcastForm} />
      <Stack.Screen name="ViewSellerProfile" component={ViewSellerProfile} />
      <Stack.Screen
        name="ViewCustomerProfile"
        component={ViewCustomerProfile}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
