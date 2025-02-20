import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Gallery,
  ViewGallery,
  GalleryPhotoView,
  GalleryContacts,
} from '../screens';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const GalleryStack = () => {
  const userType = useSelector(state => state.user?.user?.userType);
  return (
    <Stack.Navigator
      initialRouteName={userType === "CUSTOMER" ? 'GalleryContacts' : 'Gallery'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="GalleryContacts" component={GalleryContacts} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="ViewGallery" component={ViewGallery} />
      <Stack.Screen name="GalleryPhotoView" component={GalleryPhotoView} />
    </Stack.Navigator>
  );
};

export default GalleryStack;
