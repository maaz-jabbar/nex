import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Welcome,
  ChooseProduct,
  Congratulations,
  ChooseFavoriteBrands
} from '../screens';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../config';
import {Header} from '../components';

const Stack = createNativeStackNavigator();

const CustomerProfileCreationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        header: props => <Header {...props} />,
      }}
      initialRouteName="Welcome">
      <Stack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={Welcome}
        initialParams={{
          isCustomer: true,
        }}
      />
      <Stack.Screen name="ChooseProduct" component={ChooseProduct} />
      <Stack.Screen name="ChooseFavoriteBrands" component={ChooseFavoriteBrands} />
      <Stack.Screen
        name="Congratulations"
        component={Congratulations}
        initialParams={{
          isCustomer: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default CustomerProfileCreationStack;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.red,
  },
});
