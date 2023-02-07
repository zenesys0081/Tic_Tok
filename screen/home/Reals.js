/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('screen');
import {launchImageLibrary} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
export default function Reals() {
  const cameraRef = useRef(null);

  const videoRecord = async () => {
    console.log('videos is not started ');
  };

  // upload the videos
  const takeVideos = async () => {
    let options = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled the action');
      } else {
        console.log('please wait set the some property');
      }
    });
  };

  const startedRecording = () => {};

  return (
    <>
      <View style={styles.container}>
        {/* <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}>
          {({camera, recordAudioPermissionStatus}) => {
            return (
              <>
                <View style={styles.capture_main_container}>
                  <TouchableOpacity
                    style={styles.left_change_camara}
                    onPress={() => takeVideos()}>
                    <Icon name="images" size={50} color={'#fff'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.capture}
                    onPress={videoRecord}></TouchableOpacity>

                  <View style={styles.change_camara}></View>
                </View>
              </>
            );
          }}
        </RNCamera> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture_main_container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    marginVertical: height * 0.005,
  },
  capture: {
    flex: 0,
    backgroundColor: '#de1620',
    borderRadius: 40,
    width: 80,
    height: 80,
    marginVertical: height * 0.03,
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  change_camara: {
    width: 60,
    height: 60,
    marginVertical: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_change_camara: {
    width: 60,
    height: 60,
    marginVertical: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: height * 0.01,
  },
});
