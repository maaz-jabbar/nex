import React from 'react';
import Navigation from './src/navigation';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

export default function App() {
  return <Navigation />;
}
