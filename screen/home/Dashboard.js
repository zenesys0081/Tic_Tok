/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/self-closing-comp */
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Lottie from 'lottie-react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import fetchClient from '../../api/fetchClient';
import {
  BASE_URL,
  GET_USER_FOLLOWING,
  GET_USER_PROFILE_DETAILS,
  GET_WATCH_VIDEOS,
  POST_GETALL_USER_COMMENT,
  POST_USER_COMMENT,
  POST_USER_FOLLOW,
  POST_USER_LIKE_VIDEOS,
  POST_USER_UNFOLLOW,
} from '../../api/endpoints';
import {data} from '../../constant/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';

export default function Dashboard({navigation}) {
  const refRBSheet = useRef();
  const [currentIndex, setIndex] = useState(0);
  const videoRef = useRef(null);

  const onBuffer = err => {
    console.log(err);
  };
  const videoError = e => {
    console.log(e);
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  const [host, setHost] = useState('');
  const [watchData, setWatchData] = useState([]);
  const [token, setToken] = useState();
  const [username, setUserName] = useState();
  const [video_id, setVideosId] = useState('');
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState('');
  const [commentData, setCommentData] = useState([]);
  const [checkFollowing, setCheckFollowing] = useState(false);

  const [like, setLike] = useState(0);
  const incrementLike = () => setLike(like + 1);
  let decrementLike = () => setLike(like - 1);

  // comment Handler to comment the videos
  const commentHandler = () => {};
  // comment bottomSheet
  const openBottomSheetHandler = () => {
    refRBSheet.current.open();
  };

  // share handler demo url  and title or message.
  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';
  const options = {
    title,
    url,
    message,
  };
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const currentNodeHandler = e => {
    setUserName(e.viewableItems[0]?.item?.username);
    setVideosId(e.viewableItems[0]?.item?._id);
  };

  const followHandler = () => {
    alert('comming soon');
  };

  // unfollow handler
  const unfollowHandler = () => {
    alert('comming soon');
  };

  const renderItem = ({index, item}) => {
    return (
      <>
        <SafeAreaView>
          <View style={{flex: 1}}>
            <Video
              source={{
                uri: item.url,
              }}
              ref={videoRef}
              onBuffer={onBuffer}
              onError={videoError}
              repeat={true}
              paused={currentIndex !== index}
              resizeMode="cover"
              style={styles.backgroundVideo}
            />
            {/* upper right container */}
            <View style={styles.uiContainer}>
              <View style={styles.rightContainer}>
                <Image
                  style={styles.profilePicture}
                  source={require('../../assets/images/user-image/first.jpg')}
                />

                {/* add the videos handler  */}
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={incrementLike}>
                  {like ? (
                    <Icon2 name="heart" size={40} color="red" />
                  ) : (
                    <Icon2 name="heart" size={40} color="#fff" />
                  )}

                  <Text style={styles.statsLabel}>{like}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={openBottomSheetHandler}>
                  <Image
                    source={require('../../assets/images/user-image/comment.png')}></Image>
                  <Text style={styles.statsLabel}>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={async () => {
                    await share();
                  }}>
                  <Icon2 name="share" size={40} color="#fff" />
                  <Text style={styles.statsLabel}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => alert('comming Soon')}>
                  <Image
                    source={require('../../assets/images/user-image/threedot.png')}></Image>
                </TouchableOpacity>
              </View>

              {/* user name and discription  */}
              <View style={styles.user_main_container}>
                <View style={styles.userid_container}>
                  <Text style={styles.handle}>{item.id}</Text>
                  <TouchableOpacity
                    style={styles.follow_btn}
                    activeOpacity={0.7}
                    onPress={followHandler}>
                    <Text style={styles.follow_btn_text}>Follow</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.description}>{item.discription}</Text>
                <View style={styles.songs_container}>
                  <View style={styles.songs_image_container}>
                    <Lottie
                      style={styles.songImage}
                      source={require('../../assets/animation/songs/songs2.json')}
                      autoPlay
                      loop
                    />
                    <Text style={styles.songName}>{item.songsName}</Text>
                  </View>
                </View>
              </View>
              {/* bottom sheet  code  */}
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressBack={true}
                animationType={'slide'}
                customStyles={styles.bottomCustomStyles}>
                {/* ui design in bottom sheet */}
                <View style={styles.bottom_item}>
                  {/* custom header  */}
                  <View style={styles.header_container}>
                    <View style={styles.header_main_container}>
                      <TouchableOpacity
                        onPress={() => refRBSheet?.current?.close()}>
                        <Icon
                          name="keyboard-backspace"
                          size={40}
                          color="#fff"
                        />
                      </TouchableOpacity>
                      <Text style={styles.comment_text}>Comments</Text>
                    </View>
                    <View style={styles.share_main_container}>
                      <TouchableOpacity
                        style={styles.share_container}
                        onPress={() => alert('comming soon')}>
                        <Icon2 name="share-all" size={40} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* comment  message container */}
                <ScrollView showsVerticalScrollIndicator={true}>
                  {loading ? (
                    <ActivityIndicator size={'large'} color={'#00ff00'} />
                  ) : (
                    <View style={styles.comment_main_container}>
                      <Text
                        style={{
                          fontSize: height / 45,
                          color: '#fff',
                          justifyContent: 'center',
                        }}>
                        Comming Soon
                      </Text>
                    </View>
                  )}
                </ScrollView>

                {/* bottom input container */}
                <View style={{marginHorizontal: height * 0.01}}>
                  <View style={styles.comment_bottom_input_container}>
                    <View style={styles.header_container}>
                      <View style={styles.header_main_container}>
                        <Image
                          source={require('../../assets/images/user-image/first.jpg')}
                          resizeMode="cover"
                          style={styles.comment_bottom_left_image}
                        />
                        <TextInput
                          placeholder="Add a comment"
                          value={comment}
                          onChangeText={text => setComment(text)}
                          placeholderTextColor={'#fff8'}
                          style={styles.comment_bottom_input}
                        />
                      </View>
                      <View style={styles.share_main_container}>
                        <TouchableOpacity
                          style={styles.share_container}
                          onPress={() => alert('comming soon')}>
                          <Icon2 name="send" size={30} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </RBSheet>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  };

  const onIndex = ({index, item}) => {
    setIndex(index); // full screen than check the current index
  };

  return (
    <>
      <View style={styles.screen}>
        <SwiperFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          vertical={true}
          onChangeIndex={onIndex}
          onViewableItemsChanged={currentNodeHandler}
          showsVerticalScrollIndicator={false}
          snapToAlignment={'start'}
          decelerationRate={'normal'}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // main
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    position: 'absolute',
    width: width,
    height: height,
  },

  uiContainer: {
    height: height,
    justifyContent: 'flex-end',
  },

  //  upper right side  container
  rightContainer: {
    alignSelf: 'flex-end',
    height: height * 0.4,
    justifyContent: 'space-between',
    marginRight: height * 0.01,
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#fff',
    fontSize: height / 55,
    fontFamily: 'RobotoSlab-Regular',
  },

  // bottom image container
  user_main_container: {
    alignSelf: 'center',
    marginBottom: height * 0.01,
  },
  userid_container: {
    marginHorizontal: height * 0.01,
    flexDirection: 'row',
    marginTop: height * 0.01,
  },
  handle: {
    color: '#fff',
    fontSize: height / 35,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: height * 0.01,
  },
  description: {
    color: '#fff',
    fontSize: height / 55,
    fontFamily: 'RobotoSlab-Regular',
    marginHorizontal: height * 0.01,
  },
  //this is songs container
  songs_container: {
    width: width * 0.95,
    flexDirection: 'row',
    marginHorizontal: height * 0.01,
    marginBottom: height * 0.01,
    justifyContent: 'space-between',
  },
  songs_image_container: {
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#4c4c4c',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  songName: {
    color: '#fff',
    fontSize: height / 50,
    fontFamily: 'RobotoSlab-Medium',
    marginLeft: height * 0.005,
  },
  bottom_image_container: {
    alignItems: 'center',
    width: width * 0.15,
  },
  follow_btn: {
    justifyContent: 'center',
    marginLeft: height * 0.02,
    width: width * 0.25,
    height: 40,
    backgroundColor: '#495e54',
    borderRadius: 12,
  },

  follow_btn_text: {
    color: '#fff',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 48,
    textAlign: 'center',
  },
  // bottom sheet styles
  bottomCustomStyles: {
    container: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: '60%',
      backgroundColor: '#000',
    },
    draggableIcon: {
      backgroundColor: 'transparent',
      position: 'absolute',
    },
  },
  bottom_item: {
    justifyContent: 'space-between',
    marginHorizontal: height * 0.02,
    marginVertical: height * 0.01,
  },
  // bottom sheet custom header styles
  header_container: {
    height: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_main_container: {
    width: width * 0.7,
    flexDirection: 'row',
  },
  comment_text: {
    alignSelf: 'center',
    color: '#fff',
    paddingLeft: height * 0.02,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 45,
  },
  share_main_container: {
    width: width * 0.15,
    justifyContent: 'center',
  },
  share_container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // comment main css
  comment_main_container: {
    flexGrow: 1,
    marginHorizontal: height * 0.01,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  comment_image_container: {
    justifyContent: 'center',
  },
  comment_profile_img: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  comment_user_container: {
    marginHorizontal: height * 0.01,
  },
  comment_profile_container: {
    width: width * 0.75,
    flexDirection: 'row',
  },
  comment_username: {
    color: '#fff',
    fontSize: height / 40,
    fontFamily: 'RobotoSlab-Bold',
    fontStyle: 'italic',
  },
  comment_follow_btn: {
    marginLeft: height * 0.02,
    width: 80,
    height: 35,
    backgroundColor: '#495466',
    borderRadius: 12,
    justifyContent: 'center',
  },
  comment_follow_btn_text: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: height / 50,
    textAlign: 'center',
    color: '#fff',
  },
  comment_message_container: {
    width: width * 0.75,
  },
  comment_message_text: {
    color: '#fff',
    fontSize: height / 48,
    fontFamily: 'RobotoSlab-Bold',
    fontStyle: 'italic',
  },
  // comment bottom-sheet input container
  comment_bottom_input_container: {
    justifyContent: 'center',
    height: height * 0.065,
    borderWidth: 1,
    borderColor: '#fff5',
    borderRadius: 5,
    backgroundColor: '#000',
    marginBottom: height * 0.008,
  },
  comment_bottom_left_image: {
    width: 35,
    height: 35,
    borderRadius: 40,
    justifyContent: 'center',
  },
  comment_bottom_input: {
    width: width * 0.7,
    color: '#fff',
    justifyContent: 'center',
    fontSize: height / 48,
    paddingLeft: height * 0.01,
    fontFamily: 'RobotoSlab-Regular',
  },
});
