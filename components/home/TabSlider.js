/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  useWindowDimensions,
  Dimensions,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {BASE_URL, GET_USER_VIDEOS} from '../../api/endpoints';
import fetchClient from '../../api/fetchClient';
const {width, height} = Dimensions.get('screen');
import Data from '../../constant/user';

export default function TabSlider(props, {navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [host, setHost] = React.useState('');
  const [videos, setVideos] = React.useState([]);
  const [like, setLike] = React.useState('');

  const [routes] = React.useState([
    {key: 'first', title: 'Videos (8)'},
    {key: 'second', title: 'like (5.6)'},
  ]);

  React.useEffect(() => {
    // user get videos call api
    fetchClient
      .get(BASE_URL, GET_USER_VIDEOS, props.token)
      .then(res => {
        // console.log('profile tabSlider videos ==>', res.result);
        setVideos(res.result.videos);
        setHost(res.result.host);
      })
      .catch(err => {
        console.log('user videos error =>', err);
        alert(err?.message);
        navigation?.navigate('Login');
      });
  }, []);

  // console.log(`videos => ${host}${e.watch}?${new Date()}`);
  // console.log('like', e.likes);

  const Video = () => {
    return (
      <View style={styles.video_container}>
        <View style={styles.video_container_videos}>
          {Data.map((e, index) => {
            return (
              <View key={index} style={{marginVertical: height * 0.01}}>
                <Image
                  source={{uri: e.url}}
                  resizeMode="cover"
                  style={styles.image}
                />
                <View style={styles.like_container}>
                  <Text style={styles.like_text}>{e.like}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const Like = () => {
    return (
      <View style={styles.user_like_container}>
        <Text style={styles.user_like_text}>Comming Soon</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    first: Video,
    second: Like,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#3393E4',
        borderRadius: 40,
        height: height * 0.06,
      }}
      activeColor="#000"
      labelStyle={{fontSize: height / 50, fontFamily: 'RobotoSlab-Bold'}}
      style={{backgroundColor: '#715886'}}
      pressOpacity={0.8}
    />
  );
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  video_container: {
    flex: 1,
    marginVertical: height * 0.01,
  },
  video_container_videos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: height * 0.01,
    flexWrap: 'wrap',
  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 12,
  },
  like_container: {
    position: 'absolute',
    marginLeft: 5,
    left: 0,
    right: 0,
    bottom: 0,
  },
  like_text: {
    color: '#fff',
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Regular',
  },
  user_like_container: {
    // flex: 1,
    backgroundColor: 'green',
    height: height * 0.4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  user_like_text: {
    color: '#fff',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 25,
    textAlign: 'center',
  },
});
