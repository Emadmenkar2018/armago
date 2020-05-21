import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import { Link } from "react-router-native";
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');
import Home from '../screens/Home';


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
    height: 210,
    marginTop: -90,
    position: 'absolute'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height/20,

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
