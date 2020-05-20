import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={images.oval} style={styles.oval}/>
        <View style={styles.header}>
            <Image source={images.gear} style={styles.icon}/>
            <Image source={images.GameOn} style={styles.logo}/>
            <Image source={images.chat} style={styles.icon}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25
  },
  oval: {
    width,
    height: 190,
    marginTop: -90,
    position: 'absolute'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: width/16
  },
  icon: {
    width: 36,
    height: 36,
  },
  logo: {
    width: 150,
    height: 35,
    top:5
  }
});
