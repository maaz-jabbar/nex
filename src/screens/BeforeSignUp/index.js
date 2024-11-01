import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import GradientButton from '../../components/GradientButton';
import Images from '../../assets';

const BeforeSignUp = ({navigation}) => {
  const moveToOnboarding = isCustomer => {
    navigation.navigate('Onboarding', {isCustomer});
  };

  const moveToLogin = () => {
    navigation.navigate('LoginSignup', {loginActive: true, isCustomer: true});
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome to Nexsa</Text>
        <Text style={styles.instructions}>shop smarter</Text>
      </View>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
        }}>
        <GradientButton
          onPress={() => moveToOnboarding(true)}
          icon={Images.cart}
          title="I am a Customer"
        />
        <GradientButton
          onPress={() => moveToOnboarding(false)}
          icon={Images.cart}
          title="I am a Seller"
        />
      </View>
      <View>
        <Text style={styles.alreadyHaveAccount}>Already have an account?</Text>
        <Text style={styles.signIn} onPress={moveToLogin}>
          Sign In
        </Text>
      </View>
      <View />
    </View>
  );
};

export default BeforeSignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.JosefinSansSemiBold,
  },
  instructions: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.NothingYouCouldDoRegular,
  },
  alreadyHaveAccount: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.lightGrey,
    fontFamily: Fonts.RobotoMedium,
  },
  signIn: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
    color: Colors.secondary,
    marginTop: 10,
  },
});
