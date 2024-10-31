import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Colors, Fonts } from '../../config';

const Contacts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contacts</Text>
    </View>
  );
};

export default Contacts;

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
