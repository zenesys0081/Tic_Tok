/* eslint-disable handle-callback-err */
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/splash/Splash';
import Login from '../screen/auth/Login';
import SignUp from '../screen/auth/SignUp';
import PasswordVerification from '../screen/auth/PasswordVerification';
import HomeTab from './HomeTab';
import EmailVerification from '../screen/auth/EmailVerification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Resetpassword from '../screen/auth/Resetpassword';
import UserFollowingDetails from '../screen/home/UserFollowingDetails';

const {height, width} = Dimensions.get('screen');

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [isSplash, setIsSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSplash(false);
      setIsLoggedIn(true);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);

  if (isSplash) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Login' : 'Splash'}
        screenOptions={{
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PasswordVerification"
          component={PasswordVerification}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Resetpassword"
          component={Resetpassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Dashboard"
          component={HomeTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UserFollowingDetails"
          component={UserFollowingDetails}
          options={{
            headerTitle: 'praveshkumar',
            headerTitleStyle: {
              fontFamily: 'RobotoSlab-Bold',
              fontSize: height / 40,
            },
          }}
        />
      </Stack.Navigator>
      {Platform.OS === 'android' ? (
        <StatusBar
          translucent
          animated={true}
          barStyle="light-content"
          backgroundColor={'gray'}
        />
      ) : (
        <StatusBar translucent animated={true} barStyle="light-content" />
      )}
    </NavigationContainer>
  );
}
