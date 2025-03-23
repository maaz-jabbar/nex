import React from 'react';
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
import {resetPassword, forgotPassSendOtp} from '../../redux/middlewares/user';
import {errorToast} from '../../config/api';

const otpError = 'Please enter a valid OTP code.';
const passwordError = 'Password must be at least 8 characters.';
const phoneError = 'Please enter a valid phone number.';

const ForgotPassword = ({navigation: {goBack}}) => {
  const dispatch = useDispatch();

  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpSent, setOtpSent] = React.useState(false);

  const passwordInput = React.useRef(null);

  const _onSubmit = () => {
    let message = [];

    if (otpSent) {
      if (otp.length < 6) {
        message.push(otpError);
      }
      if (password.length < 8) {
        message.push(passwordError);
      }
      message = message.join('\n');
      if (message) return errorToast({message});
      dispatch(
        resetPassword(phone, otp, password, () => {
          goBack();
        }),
      );
    } else {
      if (phone.length < 10) {
        message.push(phoneError);
      }
      message = message.join('\n');
      if (message) return errorToast({message});
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
          style={styles.backIconContainer}>
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
            activeOpacity={0.8}
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
              Forgot Password
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
            justifyContent: 'space-between',
          }}>
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
              </>
            )}
          </View>
          <GradientButton
            buttonStyle={{alignSelf: 'center', width: 200, marginTop: 20}}
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
