import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import {GradientButton} from '../../components';
import {useSelector} from 'react-redux';

const Welcome = ({navigation}) => {
  const userType = useSelector(state => state.user?.userType);
  const isCustomer = userType === 'CUSTOMER';

  const moveToProfileCreation = () => {
    if (isCustomer) {
      navigation.navigate('ChooseProduct');
    } else {
      navigation.navigate('ChoosePosition');
    }
  };

  const skip = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.letsCreate}>Let's create your profile</Text>
      <GradientButton
        title="Next"
        onPress={moveToProfileCreation}
        buttonStyle={styles.nextButton}
      />
      <Text style={styles.skip} onPress={skip}>
        Skip - edit profile in Settings
      </Text>
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
  nextButton: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 20,
  },
  skip: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
    fontFamily: Fonts.RobotoRegular,
    textDecorationLine: 'underline',
  },
});
