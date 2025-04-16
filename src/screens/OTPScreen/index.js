import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {GradientButton} from '../../components';
import {useDispatch} from 'react-redux';
import {login, sendOTP, signup, verifyOTP} from '../../redux/middlewares/user';
import {errorToast} from '../../config/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OTPTextInput from 'react-native-otp-textinput';

const otpError = 'Please enter a valid OTP code.';

const OTPScreen = ({route, navigation: {goBack, navigate}}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState('');
  const {fullName, phone, email, password, isCustomer} = route.params || {};
  const [timer, setTimer] = useState(59);
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setIsResendAllowed(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    dispatch(
      sendOTP(phone, isSent => {
        if (isSent?.includes('success')) {
          setTimer(59);
          setIsResendAllowed(false);
        } else {
          errorToast({message: isSent});
        }
      }),
    );
  };

  const handleSubmit = () => {
    let message = [];
    if (!otp) {
      message.push(otpError);
    }

    if (message.length) {
      return errorToast({message: message.join('\n')});
    }

    dispatch(
      verifyOTP(phone, otp, isSuccess => {
        if (isSuccess) {
          goBack();
          dispatch(
            signup(
              fullName,
              phone,
              email,
              password,
              isCustomer ? 'CUSTOMER' : 'AGENT',
              () => {
                dispatch(login(email, password));
              },
            ),
          );
        } else {
          errorToast({message: 'Invalid OTP'});
        }
      }),
    );
  };

  const {top} = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <ImageBackground
        source={Images.bgLogo}
        resizeMode="contain"
        style={styles.imageBackground}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goBack}
          style={[styles.backIconContainer, {top: top + 10}]}>
          <Image source={Images.back} style={styles.back} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.topBar}>
          <View style={styles.topBarInner}>
            <Text style={styles.enterOtpText}>Enter OTP</Text>
          </View>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <OTPTextInput
              ref={e => {
                otpInput = e;
              }}
              inputCount={6}
              tintColor={Colors.primary}
              autoCapitalize="characters"
              autoFocus
              textInputStyle={styles.otpInput}
              handleTextChange={setOtp}
            />
          </View>
          <Text style={styles.resendText}>
            {isResendAllowed ? (
              <Text onPress={handleResendOTP} style={styles.resendLink}>
                Resend Code
              </Text>
            ) : (
              `Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}`
            )}
          </Text>
          <GradientButton
            buttonStyle={styles.submitButton}
            onPress={handleSubmit}
            title={'Complete Sign Up'}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  back: {
    width: 25,
    height: 25,
  },
  backIconContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 40,
  },
  contentContainer: {
    flex: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
  },
  topBarInner: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 10,
  },
  enterOtpText: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: Fonts.RobotoMedium,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  otpInput: {
    borderColor: 'red',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  resendText: {
    textAlign: 'center',
    marginTop: 20,
  },
  resendLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  submitButton: {
    alignSelf: 'center',
    width: 200,
    marginTop: 40,
  },
});

export default OTPScreen;
