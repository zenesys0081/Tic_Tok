/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
const {width, height} = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification({navigation}) {
  return (
    <View style={styles.screen}>
      <Text style={{fontSize: 25, color: '#fff'}}>Comming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  btn: {
    backgroundColor: 'red',
    width: 150,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
