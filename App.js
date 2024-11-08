import React from 'react';
import Navigation from './src/navigation';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux';
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
