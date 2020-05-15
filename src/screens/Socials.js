import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import { colors } from '../common/colors';
import { images } from '../common/images';

export default class Socials extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.main}>
            <Image source={images.group} style={styles.groupImg}/>
            <Image source={images.grape} style={styles.img}/>
            <View style={{ flex: 1, marginLeft: 6}}>
                <Text style={[styles.title, { marginTop: 5}]}>Bristol Tennis Social</Text>
                <Text style={[styles.text, { marginVertical: 6}]}>{'Family Social\nGravity'}</Text>
                <Text style={styles.text}>{'Swipe to join - Exclusive to app users'}</Text>
            </View>
            <View style={styles.bar}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.circle}>
                      <Text style={styles.text}>SAT</Text>
                    </View>
                    <Text style={styles.text}>8PM</Text>
                </View>
                <Image source={images.racket} style={styles.racket}/>
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
      width: '100%',
      height: 180,
      borderRadius: 60
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
    fontFamily: 'ProximaNova-Regular'
  },
  title: {
    color: colors.white,
    fontSize: 25,
    fontFamily: 'Proxima Nova Bold'
  },
  bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  racket: {
      width: 60,
      height: 60
  }
});
