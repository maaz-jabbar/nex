import React, {useRef, useState} from 'react';
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
  const {top} = useSafeAreaInsets();

  const [loginActive, setLoginActive] = useState(
    route?.params?.loginActive ?? false,
  );
  const userType = useSelector(state => state.user?.userType);
  const rememberMe = useSelector(state => state.user?.rememberMe);
  const isCustomer = userType === 'CUSTOMER';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSendError, setOtpSendError] = useState('');

  const otpInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSubmit = () => {
    let message = [];

    if (!loginActive && fullName.length < 3) message.push(nameError);
    if (!loginActive && phone.length < 10) message.push(phoneError);
    if (otpSent && !otp) message.push(otpError);
    if (!EmailValidator.validate(email)) message.push(emailError);
    if (password.length < 8) message.push(passwordError);

    if (message.length) {
      return errorToast({message: message.join('\n')});
    }

    if (loginActive) {
      dispatch(login(email, password));
      return;
    }

    if (!otpSent) {
      dispatch(
        sendOTP(phone, isSent => {
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
    } else {
      dispatch(
        verifyOTP(phone, otp, isSuccess => {
          if (isSuccess) {
            dispatch(
              signup(
                fullName,
                phone,
                email,
                password,
                isCustomer ? 'CUSTOMER' : 'AGENT',
                () => dispatch(login(email, password)),
              ),
            );
          } else {
            errorToast({message: 'Invalid OTP'});
          }
        }),
      );
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}>
      <ImageBackground
        source={Images.bgLogo}
        resizeMode="contain"
        style={styles.logoBackground}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goBack}
          style={[styles.backIconContainer, {top: top + 10}]}>
          <Image source={Images.back} style={styles.backIcon} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setLoginActive(false)}
            style={[styles.tabButton, !loginActive && styles.activeTab]}>
            <Text
              style={[styles.tabText, !loginActive && styles.activeTabText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setLoginActive(true)}
            style={[styles.tabButton, loginActive && styles.activeTab]}>
            <Text style={[styles.tabText, loginActive && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View>
            {!loginActive && (
              <>
                <TextInputCustom
                  title="Full Name"
                  icon={Images.name}
                  textInputProps={{
                    value: fullName,
                    onChangeText: setFullName,
                    keyboardType: 'default',
                    returnKeyType: 'next',
                    onSubmitEditing: () => phoneInput.current.focus(),
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
                    onSubmitEditing: () => emailInput.current.focus(),
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
                      onSubmitEditing: () => emailInput.current.focus(),
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
                onSubmitEditing: () => passwordInput.current.focus(),
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
                  setIsChecked={() =>
                    dispatch({type: 'SAVE_REMEMBER_ME', payload: !rememberMe})
                  }
                />
                <Text
                  style={styles.forgotPassword}
                  onPress={() => navigate('ForgotPassword')}>
                  Forgot Password
                </Text>
              </View>
            ) : (
              <Text style={styles.agreementText}>
                By signing up, you agree to our{' '}
                <Text style={styles.linkText}>Terms</Text> &{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            )}
          </View>

          <GradientButton
            buttonStyle={styles.button}
            onPress={handleSubmit}
            title={loginActive ? 'Sign In' : 'Sign Up'}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  backIconContainer: {
    position: 'absolute',
    left: 20,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 40,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  formContainer: {
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
  tabButton: {
    paddingBottom: 10,
    borderBottomWidth: 0,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.mediumGrey,
    fontFamily: Fonts.RobotoMedium,
  },
  activeTabText: {
    color: Colors.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
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
  agreementText: {
    alignSelf: 'center',
    color: Colors.lightGrey,
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
    marginTop: 10,
  },
  linkText: {
    color: Colors.secondary,
  },
  button: {
    alignSelf: 'center',
    width: 150,
    marginTop: 20,
  },
});
