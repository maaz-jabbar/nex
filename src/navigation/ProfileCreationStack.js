import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome, ChoosePosition, ChooseLocation, Congratulations} from '../screens';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../config';
import { Header } from '../components';

const Stack = createNativeStackNavigator();

const ProfileCreationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        header: (props) => <Header {...props} />,
      }}
      initialRouteName="Welcome">
      <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
      <Stack.Screen name="ChoosePosition" component={ChoosePosition} />
      <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
      <Stack.Screen name="Congratulations" component={Congratulations} />
    </Stack.Navigator>
  );
};

export default ProfileCreationStack;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.red,
  },
});
