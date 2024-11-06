import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Settings, Home, Gallery} from '../screens';
import {StyleSheet} from 'react-native';
import TabbarCustom from '../components/Tabbar';
import ContactsStack from './ContactsStack';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return ( 
    <Tab.Navigator initialRouteName="ChatLanding" screenOptions={{headerShown: false}} tabBar={props => <TabbarCustom {...props} />}>
      <Tab.Screen name="ChatLanding" component={ChatStack} />
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contacts" component={ContactsStack} />
      <Tab.Screen name="Settings" component={Settings} />
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
