import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import { colors } from '../common/colors';
import { images } from '../common/images';

export default class TrialBack extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.main}>
          <ImageBackground source={images.mask} style={styles.backgroundImage}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image source={images.trial} style={styles.img} />
              <Text style={styles.text1}>Advanced Trials</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 6 }}>
              <Text style={styles.text}>{"If you are looking to play with the advanced team or advanced squad you will need to swipe right to select the times you are available to come for a trial'"}</Text>
            </View>
          </ImageBackground>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  main: {
    flex: 1,
    marginHorizontal: 45,
    marginVertical: 0
  },
  backgroundImage: {
    flex: 1,
    resizeMode : "contain",
    width: null,
    height: null,
    marginVertical: 17
  },
  img: {
    width: 80,
    height: 60,
    top:10,
    left:20,
    borderRadius: 20
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'ProximaNova-Regular',
    
    marginHorizontal: 10,
    marginVertical: 20
  },
  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '700'
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text1: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    left:30,
    top: 10
  }
});
