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
import {Colors, Fonts, phoneRegex} from '../../config';
import Images from '../../assets';
import {GradientButton, TextInputCustom} from '../../components';
import {useDispatch} from 'react-redux';
import {resetPassword, forgotPassSendOtp} from '../../redux/middlewares/user';
import {errorToast} from '../../config/api';

const otpError = 'Please enter a valid OTP code.';
const passwordError = 'Password must be at least 8 characters.';
const phoneError = 'Please enter a valid phone number.';

const ForgotPassword = ({navigation: {goBack}}) => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const passwordInput = useRef(null);

  const _onSubmit = () => {
    let message = [];

    if (otpSent) {
      if (otp.length < 6) message.push(otpError);
      if (password.length < 8) message.push(passwordError);
    } else {
      if (!phoneRegex.test(phone)) message.push(phoneError);
    }

    if (message.length) return errorToast({message: message.join('\n')});

    if (otpSent) {
      dispatch(
        resetPassword(phone, otp, password, () => {
          goBack();
        }),
      );
    } else {
      dispatch(
        forgotPassSendOtp(phone, isSent => {
          setOtpSent(isSent);
        }),
      );
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientContainer}>
      <ImageBackground
        source={Images.bgLogo}
        resizeMode="contain"
        style={styles.imageBackground}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goBack}
          style={styles.backIconContainer}>
          <Image source={Images.back} style={styles.back} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.whiteContainer}>
        <View style={styles.topBar}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Forgot Password</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View>
            <TextInputCustom
              title="Phone Number"
              icon={Images.phone}
              textInputProps={{
                value: phone,
                editable: !otpSent,
                onChangeText: setPhone,
                keyboardType: 'number-pad',
                returnKeyType: 'next',
              }}
            />

            {otpSent && (
              <>
                <TextInputCustom
                  title="OTP"
                  icon={Images.otp}
                  textInputProps={{
                    value: otp,
                    onChangeText: setOtp,
                    keyboardType: 'number-pad',
                    returnKeyType: 'next',
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
                  }}
                  ref={passwordInput}
                />
              </>
            )}
          </View>

          <GradientButton
            buttonStyle={styles.button}
            onPress={_onSubmit}
            title={otpSent ? 'Reset Password' : 'Send OTP'}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  gradientContainer: {
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
  backIconContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 40,
  },
  back: {
    width: 25,
    height: 25,
  },
  whiteContainer: {
    flex: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: Fonts.RobotoMedium,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
  },
});
