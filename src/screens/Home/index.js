import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Colors, Fonts } from '../../config';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
});
