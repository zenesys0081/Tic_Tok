/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import {follow} from '../../constant/followData';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const {width, height} = Dimensions.get('screen');

export default function UserFollowingDetails({route, navigation}) {
  const [followersData, setFollowersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: ` 10   Following`, id: 1},
    {key: 'second', title: ` 10  Followers`, id: 2},
    {key: 'three', title: 'subscriptions', id: 3},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#fff',
        borderRadius: 40,
        height: height * 0.003,
      }}
      activeColor="#fff"
      labelStyle={{fontSize: height / 68, fontFamily: 'RobotoSlab-Black'}}
      style={{
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      }}
      pressOpacity={0.8}
    />
  );

  useEffect(() => {}, []);

  // --------------------------------- This is a followings function  --------------------------------
  const following = () => {
    return (
      <View style={styles.container}>
        {/* sorted container  */}
        <View style={styles.sorted_main_container}>
          <View style={styles.sorted_left_container}>
            <Text style={styles.sorted_text}>Sorted by default</Text>
          </View>
          <TouchableOpacity
            style={styles.sorted_right_container}
            activeOpacity={0.7}
            onPress={() => alert('comming soon')}>
            <Icon name="unsorted" color={'#fff'} size={30} />
          </TouchableOpacity>
        </View>
        {/* user following container */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator
              size={'large'}
              color="red"
              style={styles.loading}
            />
          ) : (
            follow?.map((data, index) => {
              return (
                <View style={styles.following_left_container} key={index}>
                  {/* image container */}
                  <View style={styles.following_left_img_container}>
                    <Image
                      source={{uri: data.url}}
                      style={styles.profile_image}
                    />
                  </View>
                  {/* user following and name container */}
                  <View style={styles.following_username_container}>
                    <Text style={styles.following_username_text}>
                      {data?.name}
                    </Text>
                    <Text style={styles.following_userfullname}>
                      {data?.name}
                    </Text>
                  </View>
                  {/* following btn */}
                  <View style={styles.following_btn_container}>
                    <TouchableOpacity
                      style={styles.following_btn_nested_container}
                      activeOpacity={0.7}
                      onPress={() => alert('comming soon')}>
                      <Text style={styles.following_btn_text}>Following</Text>
                    </TouchableOpacity>
                  </View>
                  {/*three dot  */}
                  <TouchableOpacity
                    style={styles.following_right_container}
                    activeOpacity={0.7}
                    onPress={() => alert('comming soon')}>
                    <Icon2
                      name="dots-three-vertical"
                      color={'#fff'}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  };
  // --------------------------------- This is a followers function  --------------------------------
  const followers = () => {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator
              color={'red'}
              size="large"
              style={styles.loading}
            />
          ) : (
            follow.map((data, index) => {
              return (
                <View style={styles.follower_left_container} key={index}>
                  {/* image container */}
                  <View style={styles.follower_left_img_container}>
                    <Image
                      source={{uri: data.url}}
                      style={styles.profile_image}
                    />
                  </View>
                  {/* user following and name container */}
                  <View style={styles.follower_username_container}>
                    <Text style={styles.following_username_text}>
                      {data.name}
                    </Text>
                    {/* <Text
                      style={styles.follower_follow_text}
                      onPress={() => alert('comming soon')}>
                      . Follow
                    </Text> */}
                  </View>
                  {/* following btn */}
                  <View style={styles.following_btn_container}>
                    <TouchableOpacity
                      style={styles.following_btn_nested_container}
                      activeOpacity={0.7}
                      onPress={() => alert('comming soon')}>
                      <Text style={styles.following_btn_text}>remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  };
  const subscriptions = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#000',
        }}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'RobotoSlab-Bold',
            fontSize: 16,
            textAlign: 'center',
          }}>
          Comming Soon
        </Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    first: following,
    second: followers,
    three: subscriptions,
  });

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
  // main
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  sorted_main_container: {
    flexDirection: 'row',
    marginVertical: height * 0.01,
  },
  sorted_left_container: {
    width: width * 0.9,
    justifyContent: 'center',
  },
  sorted_text: {
    color: '#fff',
    paddingLeft: height * 0.01,
    fontSize: height / 50,
    fontFamily: 'RobotoSlab-Bold',
  },
  sorted_right_container: {
    width: width * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: height * 0.01,
  },
  following_left_container: {
    flexDirection: 'row',
    marginVertical: height * 0.01,
  },
  following_left_img_container: {
    width: width * 0.19,
    justifyContent: 'center',
    paddingLeft: height * 0.0055,
  },
  following_username_container: {
    width: width * 0.45,
    justifyContent: 'center',
  },
  following_username_text: {
    color: '#fff',
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Bold',
  },
  following_userfullname: {
    color: '#fff9',
    fontSize: height / 50,
    fontFamily: 'RobotoSlab-Bold',
  },
  following_btn_container: {
    width: width * 0.25,
    justifyContent: 'center',
  },
  following_btn_nested_container: {
    backgroundColor: '#258085',
    height: height * 0.045,
    justifyContent: 'center',
    borderRadius: 15,
  },
  following_btn_text: {
    color: '#fff',
    fontSize: height / 48,
    fontFamily: 'RobotoSlab-Bold',
    textAlign: 'center',
  },
  following_right_container: {
    width: width * 0.1,
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  profile_image: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  //   followers css
  follower_left_container: {
    flexDirection: 'row',
    marginVertical: height * 0.01,
  },
  follower_left_img_container: {
    width: width * 0.19,
    justifyContent: 'center',
    paddingLeft: height * 0.0055,
  },
  follower_username_container: {
    flexDirection: 'row',
    width: width * 0.55,
    alignSelf: 'center',
  },
  follower_follow_text: {
    color: '#537be0',
    fontSize: height / 50,
    fontFamily: 'RobotoSlab-Bold',
    paddingLeft: height * 0.005,
  },
});
