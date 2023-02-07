import React from 'react';
import {LogBox} from 'react-native';
import Navigation from './navigation/Navigation';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return <Navigation />;
}
