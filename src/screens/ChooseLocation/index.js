import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton, TextInputCustom} from '../../components';

const ChooseLocation = ({navigation}) => {
  const moveToCongratulations = () => {
    navigation.navigate('Congratulations');
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.heading}>Location</Text>
        <TextInputCustom
          title="City, State"
          containerStyle={styles.input}
          hideLabel
        />
      </View>
      <View style={styles.lowerContainer}>
        <GradientButton
          title="Create Profile"
          containerStyle={styles.button}
          onPress={moveToCongratulations}
        />
        <Text style={styles.editProfile}>Edit your profile in Settings</Text>
      </View>
    </View>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  lowerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  upperContainer: {
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
    marginVertical: 10,
  },
  input: {
    alignSelf: 'stretch',
  },
  button: {
    width: 150,
    alignSelf: 'center',
  },
  editProfile: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: Fonts.RobotoRegular,
  },
});
