import React from 'react';
import {
  Image,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import {CheckBox, GradientButton, TextInputCustom} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {login, signup, sendOTP, verifyOTP} from '../../redux/middlewares/user';
import * as EmailValidator from 'email-validator';
import {errorToast} from '../../config/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const otpError = 'Please enter a valid OTP code.';
const emailError = 'Please enter a valid email.';
const passwordError = 'Password must be at least 8 characters.';
const phoneError = 'Please enter a valid phone number.';
const nameError = 'Please enter a valid name (at least 3 characters).';

const LoginSignup = ({route, navigation: {goBack, navigate}}) => {
  const dispatch = useDispatch();

  const [loginActive, setLoginActive] = React.useState(
    route?.params?.loginActive,
  );
  const userType = useSelector(state => state.user?.userType);
  const rememberMe = useSelector(state => state.user?.rememberMe);
  const isCustomer = userType === 'CUSTOMER';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [fullName, setfullName] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpSent, setOtpSent] = React.useState(false);

  const otpInput = React.useRef(null);
  const phoneInput = React.useRef(null);
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const [otpSendError, setOtpSendError] = React.useState('');

  const _onSubmit = () => {
    let message = [];
    if (fullName.length < 3 && !loginActive) {
      message.push(nameError);
    }
    if (phone.length < 10 && !loginActive) {
      message.push(phoneError);
    }
    if (!otp && otpSent) {
      message.push(otpError);
    }
    if (!EmailValidator.validate(email)) {
      message.push(emailError);
    }
    if (password.length < 8) {
      message.push(passwordError);
    }
    message = message.join('\n');
    if (message) return errorToast({message});
    if (loginActive) {
      dispatch(login(email, password));
      return;
    }
    if (!otpSent) {
      dispatch(
        sendOTP(phone, isSent => {
          if (isSent)
            if (isSent?.includes('success')) {
              navigate('OTPScreen', {
                fullName,
                phone,
                email,
                password,
                isCustomer,
              });
            } else {
              setOtpSendError(isSent);
            }
        }),
      );

      return;
    } else {
      dispatch(
        verifyOTP(phone, otp, isSuccess => {
          console.log(isSuccess, 'issuccess');
          if (isSuccess) {
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
    }
  };

  const {top} = useSafeAreaInsets();

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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setLoginActive(false);
            }}
            style={{
              borderBottomWidth: loginActive ? 0 : 2,
              borderBottomColor: Colors.primary,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: loginActive ? Colors.mediumGrey : Colors.secondary,
                fontFamily: Fonts.RobotoMedium,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setLoginActive(true);
            }}
            style={{
              borderBottomWidth: loginActive ? 2 : 0,
              borderBottomColor: Colors.primary,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: loginActive ? Colors.secondary : Colors.mediumGrey,
                fontFamily: Fonts.RobotoMedium,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingBottom: 30,
            justifyContent: 'space-between',
          }}>
          <View>
            {!loginActive && (
              <>
                <TextInputCustom
                  title="Full Name"
                  icon={Images.name}
                  textInputProps={{
                    value: fullName,
                    onChangeText: setfullName,
                    keyboardType: 'default',
                    returnKeyType: 'next',
                    onSubmitEditing: () => {
                      phoneInput.current.focus();
                    },
                  }}
                />
                <TextInputCustom
                  title="Phone Number"
                  icon={Images.phone}
                  error={otpSendError}
                  textInputProps={{
                    value: phone,
                    onChangeText: val => {
                      setPhone(val);
                      setOtpSent(false);
                      setOtp('');
                      setOtpSendError('');
                    },
                    keyboardType: 'phone-pad',
                    returnKeyType: 'next',
                    ref: phoneInput,
                    onSubmitEditing: () => {
                      emailInput.current.focus();
                    },
                  }}
                />
                {otpSent && (
                  <TextInputCustom
                    title="OTP"
                    icon={Images.otp}
                    textInputProps={{
                      value: otp,
                      maxLength: 6,
                      onChangeText: setOtp,
                      keyboardType: 'number-pad',
                      returnKeyType: 'next',
                      ref: otpInput,
                      onSubmitEditing: () => {
                        emailInput.current.focus();
                      },
                    }}
                  />
                )}
              </>
            )}
            <TextInputCustom
              title="Email Address"
              icon={Images.email}
              textInputProps={{
                autoCapitalize: 'none',
                autoCorrect: false,
                textContentType: 'emailAddress',
                value: email,
                onChangeText: setEmail,
                keyboardType: 'email-address',
                returnKeyType: 'next',
                ref: emailInput,
                onSubmitEditing: () => {
                  passwordInput.current.focus();
                },
              }}
            />
            <TextInputCustom
              title="Password"
              isPassword
              textInputProps={{
                value: password,
                onChangeText: setPassword,
                keyboardType: 'default',
                returnKeyType: 'done',
                secureTextEntry: true,
                ref: passwordInput,
              }}
            />
            {loginActive ? (
              <View style={styles.options}>
                <CheckBox
                  title="Remember me"
                  isChecked={rememberMe}
                  setIsChecked={() => {
                    dispatch({type: 'SAVE_REMEMBER_ME', payload: !rememberMe});
                  }}
                />
                <Text
                  suppressHighlighting
                  onPress={() => {
                    navigate('ForgotPassword');
                  }}
                  style={styles.forgotPassword}>
                  Forgot Password
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                  color: Colors.lightGrey,
                  textAlign: 'center',
                  fontFamily: Fonts.RobotoMedium,
                }}>
                By signing up, you agree to our{'\n'}
                <Text
                  style={{
                    color: Colors.secondary,
                  }}>
                  Terms
                </Text>
                {' & '}
                <Text
                  style={{
                    color: Colors.secondary,
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            )}
          </View>
          <GradientButton
            buttonStyle={{alignSelf: 'center', width: 150, marginTop: 20}}
            onPress={_onSubmit}
            title={loginActive ? 'Sign In' : 'Sign Up'}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default LoginSignup;

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
