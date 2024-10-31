import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatLanding, Contacts, Settings, Home, Gallery} from '../screens';
import {Image, StyleSheet} from 'react-native';
import Images from '../assets';
import TabbarCustom from '../components/Tabbar';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return ( 
    <Tab.Navigator initialRouteName="ChatLanding" screenOptions={{headerShown: false}} tabBar={props => <TabbarCustom {...props} />}>
      <Tab.Screen name="ChatLanding" component={ChatLanding} />
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contacts" component={Contacts} />
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
