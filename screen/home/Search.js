/* eslint-disable no-alert */
/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import user from '../../constant/user';
export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const findUser = text => {
    setSearchQuery(text);
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View>
        <View style={styles.search_bar}>
          <Searchbar
            placeholder="Please find the user"
            value={searchQuery}
            onChangeText={findUser}
          />
        </View>
        <ScrollView
          style={{marginBottom: height * 0.08}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.image_main_container}>
            {user.map((e, index) => {
              return (
                <View key={index} style={styles.image_container}>
                  <Image
                    source={{uri: e.url}}
                    resizeMode="cover"
                    style={styles.img}
                  />
                  <View style={styles.text_container}>
                    <Text style={styles.text}>{e.like}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  search_bar: {
    marginVertical: height * 0.01,
  },
  image_main_container: {
    flexDirection: 'row',
    marginHorizontal: height * 0.01,
    flexWrap: 'wrap',
  },
  image_container: {
    marginVertical: height * 0.01,
    marginHorizontal: height * 0.01,
  },
  img: {
    width: width * 0.27,
    height: height * 0.2,
    borderRadius: 12,
  },
  text_container: {
    position: 'absolute',
    marginLeft: 5,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    color: '#fff',
    fontSize: height / 45,
    fontFamily: 'RobotoSlab-Regular',
  },
});
