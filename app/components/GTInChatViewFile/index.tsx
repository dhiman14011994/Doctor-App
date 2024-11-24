import React from 'react';
import {View, Modal, TouchableOpacity, StyleSheet, Text} from 'react-native';
// import {WebView} from 'react-native-webview';
import CONSTANTS from '../../utils/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

function GTInChatViewFile({props, visible, onClose}: any) {
  const {currentMessage} = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
          }}>
          {/* <WebView
            source={{
              uri: currentMessage.document,
            }}
            style={{}}
            originWhitelist={['*']}

            //   trustAllCerts={false}
          /> */}
          <TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
            <Text style={styles.textBtn}>X</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default GTInChatViewFile;
const styles = StyleSheet.create({
  buttonCancel: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: 13,
    top: 20,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
