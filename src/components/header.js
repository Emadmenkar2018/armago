import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,SafeAreaView  } from 'react-native';
import { Link } from "react-router-native";
import { images } from '../common/images';
import AppStatusBar from './AppStatusBar';
import { colors } from '../common/colors';
export const { width, height } = Dimensions.get('window');
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight
} from "react-native-responsive-dimensions";

const THEME_COLOR = colors.lightgreen;

export default class Header extends Component {
  render() {
    return (
      <>
      <SafeAreaView/>
            <SafeAreaView>
                <AppStatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
                <View style={styles.container}>
                  <Image source={images.oval} style={styles.oval}/>
                  <View style={styles.header}>
                      <TouchableOpacity onPress={() => this.props.navigate('Settings')}>
                        <Image source={images.gear} style={styles.icon}/>
                      </TouchableOpacity>
                      <Image source={images.GameOn} style={styles.logo}/>
                      <TouchableOpacity onPress={() => this.props.navigate('Messages')}>
                        <Image source={images.chat} style={styles.icon}/>
                      </TouchableOpacity>
                  </View>
                </View>
            </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25
  },
  oval: {
    width,
    height: responsiveScreenWidth(45),
    marginTop: -80,
    position: 'absolute'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1)
  },
  icon: {
    width: 36,
    height: 36,
    // marginTop: -10
    top: 15
  },
  logo: {
    width: 180,
    height: 35,
    top:20
  }
});
