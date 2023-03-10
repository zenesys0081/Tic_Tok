/* eslint-disable curly */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [rightIcon, setRightIcon] = useState('eye-off');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_register'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_register', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_register (email VARCHAR(20),firstName VARCHAR(20),lastName VARCHAR(20), phone INTEGER(20),password INTEGER(20))',
              [],
            );
          } else {
            console.log('email created already');
          }
        },
      );
    });
  }, []);

  // call the api register the user
  const registerHandler = () => {
    if (!email) {
      alert('Please enter the email');
      return;
    } else if (!firstName) {
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
    setLoading(true);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user_register (email, firstName, lastName, phone, password) VALUES (?,?,?,?,?)',
        [email, firstName, lastName, phone, password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            setLoading(false);
            Alert.alert(
              'Success',
              'User Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
            setLoading(false);
          }
        },
      );
    });
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
                placeholder={'Enter the Email-Id'}
                placeholderTextColor={'#0006'}
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder={'Enter the first Name'}
                placeholderTextColor={'#0006'}
                value={firstName}
                onChangeText={text => setFirstName(text)}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder={'Enter the last Name'}
                placeholderTextColor={'#0006'}
                value={lastName}
                onChangeText={text => setLastName(text)}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder={'Enter the Phone'}
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
                  placeholder={'Enter the password'}
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
