import React from 'react';
import Navigation from './src/navigation';
import {KeyboardAvoidingView, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux';
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Wrapper>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Wrapper>
  );
}

function Wrapper({children}) {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{flex: 1}}>{children}</View>;
}
