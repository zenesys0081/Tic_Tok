/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSheet() {
  const refRBSheet = useRef();
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressBack={true}
      animationType={'slide'}
      customStyles={styles.bottomCustomStyles}>
      {/* ui design in bottom sheet */}
      <View style={{borderWidth: 1, borderColor: 'red', height: '50%'}}>
        <Text>aslkdjflkj askdjf</Text>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({});
