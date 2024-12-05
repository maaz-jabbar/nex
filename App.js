import React from 'react';
import Navigation from './src/navigation';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  LogBox,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux';
import Toast from 'react-native-toast-message';
import {Fonts} from './src/config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Wrapper>
      <Provider store={store}>
        <Navigation />
        <Loader />
        <Toast config={toastConfig} />
      </Provider>
    </Wrapper>
  );
}

function Wrapper({children}) {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{flex: 1}}>{children}</View>;
}

const toastConfig = {
  error: ({text2}) => (
    <View
      style={{
        width: '80%',
        backgroundColor: '#c0544e',
        padding: 20,
        borderRadius: 5,
        minHeight: 60,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
      }}>
      <Text
        style={{color: 'white', fontSize: 14, fontFamily: Fonts.RobotoRegular}}>
        {text2}
      </Text>
    </View>
  ),
  success: ({text2}) => (
    <View
      style={{
        width: '80%',
        backgroundColor: '#58b258',
        padding: 20,
        borderRadius: 5,
        minHeight: 60,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
      }}>
      <Text
        style={{color: 'white', fontSize: 14, fontFamily: Fonts.RobotoRegular}}>
        {text2}
      </Text>
    </View>
  ),
};

function Loader() {
  const styles = {
    loader: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  };
  const loader = useSelector(state => state?.loader);
  const {height, width} = useWindowDimensions();
  if (!loader) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: getStatusBarHeight(),
        height,
        width,
      }}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            marginTop: 10,
            fontFamily: Fonts.RobotoRegular,
          }}>
          Loading...
        </Text>
      </View>
    </View>
  );
}
