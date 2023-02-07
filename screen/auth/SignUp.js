/* eslint-disable curly */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [available, setUnavailable] = useState(false);
  const [rightIcon, setRightIcon] = useState('eye-off');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  // call the api register the user
  const registerHandler = () => {
    if (!firstName) {
      alert('Please enter the firstName');
      return;
    } else if (!lastName) {
      alert('Please enter the lastName');
      return;
    } else if (!phone) {
      alert('Please enter the phone number');
      return;
    } else if (!password) {
      alert('Please enter the password');
      return;
    }
    if (
      firstName === 'pravesh' &&
      lastName === 'kumar' &&
      phone === '7078235703' &&
      password === 'kumar@2002'
    ) {
      navigation.replace('Login');
      alert('User is registered Successfully !!');
    } else alert('Please enter the all correct details');
  };

  // password show and hide function
  const passwordHandler = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['purple', 'white']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <ScrollView>
          <View style={styles.main_container}>
            <Text style={styles.heading}>Register</Text>
            <Text style={styles.heading_title}>Create Account</Text>
            {/* email container */}
            <View style={styles.input_main_container}>
              <TextInput
                style={styles.input}
                placeholder={'FirstName hint - pravesh'}
                placeholderTextColor={'#0006'}
                value={firstName}
                onChangeText={text => setFirstName(text)}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder={'LastName hint - kumar'}
                placeholderTextColor={'#0006'}
                value={lastName}
                onChangeText={text => setLastName(text)}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder={'Phone hint - 7078235703'}
                placeholderTextColor={'#0006'}
                value={phone}
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={text => setPhone(text)}
                autoCapitalize="none"
              />

              {/* password */}
              <View style={styles.user_input_container}>
                <TextInput
                  style={styles.user_input}
                  placeholder={'password hint - kumar@2002'}
                  placeholderTextColor={'#0006'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  autoCapitalize="none"
                  secureTextEntry={passwordVisibility}
                />
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={passwordHandler}>
                  <Icon2
                    name={rightIcon}
                    size={30}
                    color="#000"
                    style={styles.eye_img}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* button container */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={registerHandler}>
              <LinearGradient
                start={{x: 0.9, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#3393E4', '#715886']}
                style={styles.button}>
                {loading ? (
                  <ActivityIndicator size="large" color="#f33" />
                ) : (
                  <Text style={styles.text}>Register</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  main_container: {
    marginVertical: height * 0.085,
    marginHorizontal: height * 0.02,
  },
  heading: {
    fontSize: height / 30,
    fontFamily: 'RobotoSlab-Bold',
    color: '#fff',
  },
  heading_title: {
    fontSize: height / 40,
    fontFamily: 'RobotoSlab-Regular',
    color: '#fff',
  },
  input_main_container: {
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  input: {
    padding: height * 0.012,
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Black',
    backgroundColor: '#fff6',
    borderRadius: 20,
    height: height * 0.065,
    marginVertical: height * 0.02,
  },
  button: {
    marginVertical: height * 0.05,
    width: width * 0.9,
    height: height * 0.065,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: height / 38,
    fontFamily: 'RobotoSlab-Bold',
    color: '#fff',
  },
  otp_container: {
    marginVertical: height * 0.02,
    marginHorizontal: height * 0.012,
    height: height * 0.05,
    justifyContent: 'center',
  },
  otp_text: {
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Medium',
    fontSize: height / 40,
    color: '#fff',
  },
  user_input_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff6',
    borderRadius: 20,
    marginVertical: height * 0.02,
  },
  user_input: {
    width: width * 0.75,
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Black',
    height: height * 0.065,
    padding: height * 0.01,
  },
  img: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: height * 0.02,
    width: 32,
    height: 32,
  },
  img2: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: height * 0.02,
    width: 32,
    height: 32,
  },
  eye_img: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: height * 0.02,
    tintColor: '#000',
    width: 32,
    height: 32,
  },
});
