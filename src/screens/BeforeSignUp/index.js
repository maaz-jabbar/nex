import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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
    navigation.navigate('Onboarding', {customerType});
  };

  const moveToLogin = () => {
    dispatch(saveUserType('CUSTOMER'));
    navigation.navigate('LoginSignup', {loginActive: true});
  };

  return (
    <View style={styles.container}>
      <View />

      <View style={styles.buttonContainer}>
        <Image style={styles.logo} source={Images.logoColored} />
        <Text style={styles.welcomeText}>How will you use Nexsa?</Text>
        <GradientButton
          onPress={() => moveToOnboarding('CUSTOMER')}
          icon={Images.customer}
          title="Customer account"
          containerStyle={{
            justifyContent: 'center',
          }}
          textStyle={{marginLeft: 10, fontFamily: Fonts.FigtreeSemiBold}}
        />
        <GradientButton
          onPress={() => moveToOnboarding('SELLER')}
          icon={Images.seller}
          title="Seller account"
          containerStyle={{
            justifyContent: 'center',
          }}
          textStyle={{marginLeft: 10, fontFamily: Fonts.FigtreeSemiBold}}
        />
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.alreadyHaveAccount}>
          Already have an account?{' '}
          <Text style={styles.signIn} onPress={moveToLogin}>
            Log In
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.lightGrey,
    fontFamily: Fonts.FigtreeRegular,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signInContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  alreadyHaveAccount: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.lightGrey,
    fontFamily: Fonts.FigtreeSemiBold,
  },
  signIn: {
    color: Colors.secondary,
  },
});
