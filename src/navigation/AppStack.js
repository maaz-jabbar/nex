import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Gallery} from '../screens';
import {StyleSheet} from 'react-native';
import TabbarCustom from '../components/Tabbar';
import ContactsStack from './ContactsStack';
import ChatStack from './ChatStack';
import SettingsStack from './SettingsStack';
import GalleryStack from './GalleryStack';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="ChatLanding"
      screenOptions={{headerShown: false}}
      tabBar={props => <TabbarCustom {...props} />}>
      <Tab.Screen name="ChatLanding" component={ChatStack} />
      <Tab.Screen name="Gallery" component={GalleryStack} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contacts" component={ContactsStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
