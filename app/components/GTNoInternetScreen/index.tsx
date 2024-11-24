import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CONSTANTS from '../../utils/constants';

const GTNoInternetScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/NoInternetConnection.png')}
      />
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  text: {
    fontSize: 18,
    color: CONSTANTS.THEME.colors.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  image: {
    height: '60%',
    width: '100%',
  },
});

export default GTNoInternetScreen;
