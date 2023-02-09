/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
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
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';

var db = openDatabase({name: 'UserDatabase.db'});
const {width, height} = Dimensions.get('screen');

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [allEmailData, setALlEmailData] = useState([]);
  const isFocused = useIsFocused();
  const [rightIcon, setRightIcon] = useState('eye-off');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

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

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM  table_user_register', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setALlEmailData(temp);
      });
    });
  }, [isFocused]);

  const loginHandler = () => {
    if (!email) {
      alert('Please enter the email');
      return null;
    }
    if (!password) {
      alert('Please enter the password');
      return null;
    }
    setLoading();
    const data = allEmailData?.filter(item => {
      return item.email === email && item.password === password;
    });
    if (data.length === 1) {
      setLoading(false);
      navigation.navigate('Dashboard');
    } else {
      setLoading(false);
      alert('Please enter the correct email and password');
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
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.heading_title}>Login your account</Text>
            {/* email container */}
            <View style={styles.input_main_container}>
              <TextInput
                style={styles.input}
                placeholder={'Enter the correct email '}
                placeholderTextColor={'#0006'}
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.user_input_container}>
              <TextInput
                style={styles.user_input}
                placeholder={'Enter the correct password'}
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

            <Text
              style={styles.forgot_text}
              onPress={() => navigation.navigate('Resetpassword')}>
              Forgot Password ?
            </Text>

            {/* button container */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={loginHandler}>
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
            {/* text */}
            <TouchableOpacity
              style={styles.otp_container}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.otp_text}>
                Don't have an account ? Sign-Up
              </Text>
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
    marginTop: height * 0.045,
    backgroundColor: '#fff6',
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    height: height * 0.065,
    borderRadius: 20,
  },
  input: {
    padding: height * 0.015,
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Black',
    justifyContent: 'center',
  },
  button: {
    width: width * 0.9,
    height: height * 0.065,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: height * 0.03,
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
  forgot_text: {
    width: width * 0.5,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontFamily: 'RobotoSlab-Medium',
    fontSize: height / 40,
    color: '#fff',
  },
  // demo add
  user_input_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff6',
    borderRadius: 20,
    marginVertical: height * 0.03,
  },
  user_input: {
    width: width * 0.75,
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Black',
    height: height * 0.065,
    padding: height * 0.015,
  },
  eye_img: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: height * 0.02,
    color: '#000',
    width: 32,
    height: 32,
  },
});
