import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
          <Image source={images.group} style={styles.groupImg} />
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Image source={images.grape} style={styles.img} />
            <Text style={styles.text1}>Advanced Trials</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={styles.text}>{"If you are looking to play with the advanced team or advanced squad you will need to swipe right to select the times you are available to come for a trial'"}</Text>
          </View>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#3498DB',
    margin: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 60,
    elevation: 5
  },
  circle: {
    backgroundColor: colors.green,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  img: {
    width: 100,
    height: 70,
    borderRadius: 26
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
    marginTop: 10
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
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10
  }
});
