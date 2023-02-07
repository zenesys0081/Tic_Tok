/* eslint-disable curly */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

export default function Resetpassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetHandler = () => {
    if (!email) {
      alert('Please enter the correct email');
      return null;
    }
    if (email === 'praveshkumar@gmail.com') {
      navigation.replace('PasswordVerification');
      alert('Your email send the otp So, please check the email !!');
    } else alert('please enter the correct email');
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
            <Text style={styles.heading}>Reset Password</Text>
            <Text style={styles.heading_title}>
              Enter the email from the email we just send you.
            </Text>
            {/* email container */}
            <View style={styles.input_main_container}>
              <TextInput
                style={styles.input}
                placeholder={'Email - praveshkumar@gmail.com'}
                placeholderTextColor={'#0006'}
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
              />
            </View>
            {/* button container */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={resetHandler}>
              <LinearGradient
                start={{x: 0.9, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#3393E4', '#715886']}
                style={styles.button}>
                {loading ? (
                  <ActivityIndicator size="large" color="#f33" />
                ) : (
                  <Text style={styles.text}>Continue</Text>
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
    marginVertical: height * 0.09,
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
  reset_container: {
    marginHorizontal: height * 0.01,
    flexDirection: 'row',
  },
  resend_text: {
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Black',
    color: '#000',
  },
  resend_text2: {
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Bold',
    color: '#fff',
  },
});
