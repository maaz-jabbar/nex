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
import {GradientButton, TextInputCustom} from '../../components';
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
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
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
        if (isSent)
          if (isSent?.includes('success')) {
            setTimer(59);
            setCanResend(false);
          } else {
            errorToast({message: isSent});
          }
      }),
    );
  };

  const _onSubmit = () => {
    let message = [];
    if (!otp) {
      message.push(otpError);
    }
    message = message.join('\n');
    if (message) return errorToast({message});
    dispatch(
      verifyOTP(phone, otp, isSuccess => {
        console.log(isSuccess, 'issuccess');
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
  let otpInput = React.useRef(null);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{flex: 1}}>
      <ImageBackground
        source={Images.bgLogo}
        resizeMode="contain"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={Images.logo}
          resizeMode="contain"
          style={{
            width: 200,
            height: 100,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goBack}
          style={[styles.backIconContainer, {top: top + 10}]}>
          <Image source={Images.back} style={styles.back} />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flex: 3,
          backgroundColor: Colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={styles.topBar}>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: Colors.primary,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.secondary,
                fontFamily: Fonts.RobotoMedium,
              }}>
              Enter OTP
            </Text>
          </View>
        </View>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}>
          <View>
            <OTPTextInput
              ref={e => {
                otpInput = e;
              }}
              inputCount={6}
              tintColor={Colors.primary}
              autoCapitalize="characters"
              autoFocus
              textInputStyle={{
                borderColor: 'red',
                borderWidth: 1,
                borderBottomWidth: 1,
                borderRadius: 10,
              }}
              handleTextChange={setOtp}
            />
          </View>
          <Text style={{textAlign: 'center', marginTop: 20}}>
            {canResend ? (
              <Text
                onPress={handleResendOTP}
                style={{
                  color: Colors.primary,
                  textDecorationLine: 'underline',
                }}>
                Resend Code
              </Text>
            ) : (
              `Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}`
            )}
          </Text>
          <GradientButton
            buttonStyle={{alignSelf: 'center', width: 200, marginTop: 40}}
            onPress={_onSubmit}
            title={'Complete Sign Up'}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    marginRight: 15,
    color: Colors.secondary,
    fontFamily: Fonts.RobotoMedium,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
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
});
