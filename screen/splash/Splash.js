import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function Splash() {
  return (
    <View style={styles.screen}>
      <LottieView
        source={require('../../assets/animation/splash.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
