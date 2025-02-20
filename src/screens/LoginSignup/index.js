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
import {login, signup} from '../../redux/middlewares/user';
import * as EmailValidator from 'email-validator';
import {errorToast} from '../../config/api';

const emailError = 'Please enter a valid email.';
const passwordError = 'Password must be at least 8 characters.';
const phoneError = 'Please enter a valid phone number.';
const nameError = 'Please enter a valid name (at least 3 characters).';

const LoginSignup = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [loginActive, setLoginActive] = React.useState(
    route?.params?.loginActive || true,
  );
  const userType = useSelector(state => state.user?.userType);
  const isCustomer = userType === 'CUSTOMER';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [fullName, setfullName] = React.useState('');

  const phoneInput = React.useRef(null);
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const _onSubmit = () => {
    let message = [];
    if (fullName.length < 3 && !loginActive) {
      message.push(nameError);
    }
    if (phone.length < 10 && !loginActive) {
      message.push(phoneError);
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
    } else {
      dispatch(
        signup(
          fullName,
          phone,
          email,
          password,
          isCustomer ? 'CUSTOMER' : 'AGENT',
          () => setLoginActive(true),
        ),
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
                  textInputProps={{
                    placeholder: 'Full Name',
                    value: fullName,
                    onChangeText: setfullName,
                    placeholderTextColor: Colors.lightGrey,
                    keyboardType: 'default',
                    returnKeyType: 'next',
                    onSubmitEditing: () => {
                      phoneInput.current.focus();
                    },
                  }}
                />
                <TextInputCustom
                  title="Phone Number"
                  textInputProps={{
                    placeholder: 'Phone Number',
                    value: phone,
                    onChangeText: setPhone,
                    placeholderTextColor: Colors.lightGrey,
                    keyboardType: 'number-pad',
                    returnKeyType: 'next',
                    ref: phoneInput,
                    onSubmitEditing: () => {
                      emailInput.current.focus();
                    },
                  }}
                />
              </>
            )}
            <TextInputCustom
              title="Email Address"
              textInputProps={{
                placeholder: 'Email Address',
                autoCapitalize: 'none',
                autoCorrect: false,
                textContentType: 'emailAddress',
                value: email,
                onChangeText: setEmail,
                placeholderTextColor: Colors.lightGrey,
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
                placeholder: 'Password',
                placeholderTextColor: Colors.lightGrey,
                keyboardType: 'default',
                returnKeyType: 'done',
                secureTextEntry: true,
                ref: passwordInput,
              }}
            />
            {loginActive ? (
              <CheckBox title="Remember me" />
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
  },
});
