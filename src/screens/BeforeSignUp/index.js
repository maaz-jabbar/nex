import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../config';
import GradientButton from '../../components/GradientButton';
import Images from '../../assets';
import {useDispatch} from 'react-redux';
import {loaderFalse, saveUserType} from '../../redux/actions/UserActions';

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
      <View />
      <View>
        <Text style={styles.welcomeText}>Welcome to Nexsa</Text>
      </View>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
        }}>
        <GradientButton
          onPress={() => moveToOnboarding('CUSTOMER')}
          icon={Images.cart}
          title="I am a Customer"
        />
        <GradientButton
          onPress={() => moveToOnboarding('seller')}
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
