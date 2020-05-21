import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');

export default class Footer extends Component {
  render() {
    return (
      <View>
        <Image source={images.oval} style={styles.oval}/>
        <View style={styles.footer}>
            <Image source={images.close} style={styles.icon}/>
            <Image source={images.check} style={styles.icon}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  oval: {
    width,
    height: width/2,
    position: 'absolute',
    bottom: -width/3.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 12,
    marginBottom: 10,
    width: 65,
    height: 65
  },
});
