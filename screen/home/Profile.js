/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import TabSlider from '../../components/home/TabSlider';
import fetchClient from '../../api/fetchClient';
import {
  BASE_URL,
  GET_USER_PROFILE_DETAILS,
  GET_USER_VIDEOS,
  PATCH_UPDATE_PROFILE_PICTURE,
  PUT_USER_UPDATE_PROFILE_DETAILS,
} from '../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen');
import Modal from 'react-native-modal';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Profile({navigation}) {
  const [star, setStar] = useState('');
  const [token, setToken] = useState(null);
  const [firstName, setFirstName] = useState('Pravesh Kumar');
  const [lastName, setLastName] = useState('(P.K.)');
  const [phone, setPhone] = useState('7078235703');
  const [description, setDescription] = useState(
    'He is the son of Pattie Mallette and Jeremy Bieber.',
  );
  const [userDetails, setUserDetails] = useState();

  const [picture, setPicture] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [btnLoader, setBtnLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {}, []);

  // update profile details
  const updateProfileHandler = () => {
    setModalVisible(!isModalVisible);
  };

  // only update the picture
  const openCameraHandler = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    let path = 'data:image/jpeg;base64,';
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled the action');
      } else {
        setPicture(``);
      }
    });
  };

  //  upload profile picture
  const openCamera = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    let path = 'data:image/jpeg;base64,';
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled the action');
      } else {
        alert('comming soon');
      }
    });
  };

  return (
    <View style={styles.screen}>
      {pageLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'red'}
          style={{flex: 1, justifyContent: 'center'}}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profile_main_container}>
            <View style={styles.profile_sub_container}>
              <TouchableOpacity
                style={styles.left_image_container}
                onPress={openCamera}>
                <Image
                  source={require('../../assets/images/user-image/first.jpg')}
                  resizeMode="cover"
                  style={styles.left_img}
                />
              </TouchableOpacity>

              {/* user details name and like and follow */}
              <View>
                <View style={styles.user_name}>
                  <Text style={styles.user_name_text}>
                    Pravesh Kumar (P.K.)
                  </Text>
                  {star === 1000 ? (
                    <LottieView
                      source={require('../../assets/animation/star2.json')}
                      autoPlay
                      loop
                      resizeMode="cover"
                      style={styles.star_image}
                    />
                  ) : null}
                </View>
                <View style={styles.follow_main_container}>
                  <TouchableOpacity
                    style={styles.follow_text_container}
                    onPress={() =>
                      navigation.navigate('UserFollowingDetails', {
                        userDetails,
                      })
                    }>
                    <Text style={styles.follow_text}>2M</Text>
                    <Text style={styles.like_text}>Followers</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.follow_text_container}
                    onPress={() =>
                      navigation.navigate('UserFollowingDetails', {
                        userDetails,
                      })
                    }>
                    <Text style={styles.follow_text}>10K</Text>
                    <Text style={styles.like_text}>Following</Text>
                  </TouchableOpacity>

                  <View style={styles.follow_text_container}>
                    <Text style={styles.follow_text}>150K</Text>
                    <Text style={styles.like_text}>Likes</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* user description and hobbies */}

            <View style={styles.user_title_container}>
              <View style={styles.user_title_icon}>
                <LottieView
                  source={require('../../assets/animation/user2.json')}
                  autoPlay
                  loop
                  resizeMode="cover"
                  style={styles.user_image}
                />
                <Text style={styles.title}>Discription</Text>
              </View>
              {/* discription container */}
              <View>
                <Text style={styles.discription}>
                  He is the son of Pattie Mallette and Jeremy Bieber. He is of
                  French-Canadian, Irish, German, English, and Scottish descent.
                </Text>
              </View>
              {/* button container */}
              <TouchableOpacity onPress={toggleModal}>
                <LinearGradient
                  start={{x: 0.9, y: 0}}
                  end={{x: 0, y: 0}}
                  colors={['#3393E4', '#715886']}
                  style={styles.button}>
                  <Text style={styles.button_text}>Edit Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* tab slider video and likes */}
            <View style={{flex: 1, height: height * 1.8}}>
              <TabSlider token={token} />
            </View>
          </View>
          {/* this is a modal container */}
          <Modal
            isVisible={isModalVisible}
            animationIn={'fadeInDownBig'}
            transparent={true}
            animationInTiming={450}
            animationOutTiming={750}
            deviceWidth={1}>
            <SafeAreaView>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <View style={styles.main_container}>
                    <TouchableOpacity
                      style={styles.modal_cancel}
                      onPress={toggleModal}>
                      <Icon name="cancel" size={45} color={'red'} />
                    </TouchableOpacity>
                    <View style={styles.image_container}>
                      {/* image container */}
                      <View style={styles.left_image_container}>
                        <Image
                          source={require('../../assets/images/user-image/first.jpg')}
                          resizeMode="cover"
                          style={styles.left_img}
                        />

                        <Text
                          style={styles.image_text}
                          onPress={openCameraHandler}>
                          Edit picture
                        </Text>
                      </View>
                      {/* details container */}
                      <View>
                        <TextInput
                          style={styles.input}
                          value={firstName}
                          // defaultValue={firstName}
                          onChangeText={value => setFirstName(value)}
                          placeholderTextColor={'#000'}
                        />
                        <TextInput
                          style={styles.input}
                          value={lastName}
                          // defaultValue={userDetails?.lastName}
                          onChangeText={text => setLastName(text)}
                        />
                        <TextInput
                          style={styles.input}
                          maxLength={10}
                          value={phone}
                          // defaultValue={userDetails?.phone}
                          onChangeText={text => setPhone(text)}
                        />
                        <TextInput
                          multiline
                          style={styles.discription_input}
                          value={description}
                          // defaultValue={userDetails?.description}
                          onChangeText={text => setDescription(text)}
                        />
                        <TouchableOpacity
                          style={styles.update_btn}
                          activeOpacity={0.7}
                          onPress={updateProfileHandler}>
                          {btnLoader ? (
                            <ActivityIndicator size={'large'} color="cyan" />
                          ) : (
                            <Text style={styles.update_btn_text}>Update</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // main
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile_main_container: {
    marginVertical: height * 0.02,
  },
  profile_sub_container: {
    marginHorizontal: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  left_image_container: {
    width: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: height * 0.01,
  },
  left_img: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    borderRadius: 40,
  },
  user_name: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    height: height * 0.06,
    alignItems: 'center',
  },
  user_name_text: {
    color: '#000',
    fontSize: height / 35,
    fontFamily: 'RobotoSlab-Bold',
  },
  star_image: {
    width: 50,
    height: 50,
  },
  follow_main_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  follow_text_container: {
    width: width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.055,
  },
  follow_text: {
    fontSize: height / 40,
    color: '#000',
    fontFamily: 'RobotoSlab-Bold',
  },
  like_text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: height / 55,
    fontFamily: 'RobotoSlab-Light',
  },
  user_image: {
    width: 40,
    height: 40,
  },
  user_title_container: {
    marginHorizontal: height * 0.01,
    padding: 8,
  },
  user_title_icon: {
    flexDirection: 'row',
    width: width * 0.95,
    height: height * 0.06,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 40,
    marginHorizontal: height * 0.01,
    color: '#000',
  },
  discription: {
    fontSize: height / 55,
    fontFamily: 'RobotoSlab-Regular',
    padding: 5,
    color: '#000',
  },
  button: {
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: height * 0.01,
  },
  button_text: {
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Bold',
    color: '#fff',
  },
  main_container: {
    backgroundColor: 'teal',
    borderRadius: 10,
  },
  image_container: {
    width: width * 0.95,
    marginHorizontal: height * 0.01,
    marginVertical: height * 0.02,
    justifyContent: 'center',
    borderRadius: 20,
  },
  image_text: {
    width: width * 0.5,
    marginVertical: height * 0.02,
    fontSize: height / 45,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    color: '#fff',
  },
  input: {
    height: height * 0.06,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: height * 0.01,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 50,
    marginVertical: height * 0.008,
    color: '#000',
  },
  discription_input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: height * 0.01,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 50,
    marginVertical: height * 0.008,
    minHeight: height * 0.06,
    color: '#000',
  },
  update_btn: {
    backgroundColor: 'red',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: height * 0.02,
  },
  update_btn_text: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 40,
    color: '#fff',
  },

  modal_cancel: {
    width: width * 0.15,
    height: height * 0.06,
    position: 'absolute',
    marginVertical: height * 0.01,
    marginHorizontal: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
