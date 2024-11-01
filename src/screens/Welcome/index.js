import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton} from '../../components';

const Welcome = ({navigation, route: {params: {isCustomer} = {}}}) => {
  const moveToProfileCreation = () => {
    if (isCustomer) navigation.navigate('ChooseProduct');
    else navigation.navigate('ChoosePosition');
  };

  const skip = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.letsCreate}>Let's create your profile</Text>
      <GradientButton
        title="Next"
        onPress={moveToProfileCreation}
        buttonStyle={{alignSelf: 'center', width: 150, marginVertical: 20}}
      />
      <Text style={styles.skip}>Skip - edit profile in Settings</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  letsCreate: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginBottom: 10,
  },
  skip: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
    fontFamily: Fonts.RobotoRegular,
  },
});
