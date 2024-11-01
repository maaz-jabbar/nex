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

const LoginSignup = ({route, navigation}) => {
  const [loginActive, setLoginActive] = React.useState(
    route?.params?.loginActive || false,
  );

  const isCustomer = route?.params?.isCustomer || true;

  const phoneInput = React.useRef(null);
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const _onSubmit = () => {
    if (isCustomer) navigation.navigate('CustomerProfileCreation');
    else navigation.navigate('ProfileCreation');
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
              textInputProps={{
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
