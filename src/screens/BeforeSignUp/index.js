import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {loaderFalse, saveUserType} from '../../redux/actions/UserActions';
import GradientButton from '../../components/GradientButton';
import Images from '../../assets';
import {Colors, Fonts} from '../../config';

const BeforeSignUp = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loaderFalse());
  }, []);

  const moveToOnboarding = customerType => {
    dispatch(saveUserType(customerType));
    navigation.navigate('Onboarding');
  };

  const moveToLogin = () => {
    dispatch(saveUserType('CUSTOMER'));
    navigation.navigate('LoginSignup', {loginActive: true});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Nexsa</Text>

      <View style={styles.buttonContainer}>
        <GradientButton
          onPress={() => moveToOnboarding('CUSTOMER')}
          icon={Images.cart}
          title="Customer account"
        />
        <GradientButton
          onPress={() => moveToOnboarding('SELLER')}
          icon={Images.cart}
          title="Seller account"
        />
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.alreadyHaveAccount}>Already have an account?</Text>
        <Text style={styles.signIn} onPress={moveToLogin}>
          Sign In
        </Text>
      </View>
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
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  signInContainer: {
    alignItems: 'center',
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
