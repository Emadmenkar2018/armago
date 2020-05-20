import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
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
          <ImageBackground source={images.mask} style={styles.backgroundImage}>
            <Image source={images.group} style={styles.groupImg}/>
            <Image source={images.grape} style={styles.img}/>
            <View style={{ flex: 1,marginHorizontal: 20 ,marginVertical: 15}}>
                <Text style={[styles.title, { marginTop: 5}]}>Bristol Tennis Social</Text>
                <Text style={[styles.text, { marginVertical: 6}]}>{'Family Social\nGravity'}</Text>
                <Text style={styles.text}>{'Swipe to join - Exclusive to app users'}</Text>
            </View>
            <View style={styles.bar}>
                <View style={{ flexDirection: 'row',marginHorizontal: 20 ,marginVertical: 20}}>
                    <View style={styles.circle}>
                      <Text style={styles.text}>SAT</Text>
                    </View>
                    <Text style={styles.text,{'marginTop' : 15, 'color': 'white'}}>8PM</Text>
                </View>
                <Image source={images.racket} style={styles.racket}/>
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
  },
  main: {
    flex: 1,
    marginHorizontal: 45,
    marginVertical: 0
  },
  backgroundImage: {
    flex: 1,
    resizeMode : "cover",
    marginVertical: 17
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
    flex:1,
    width: '90%',
    left:'5%',
    height: 180,
    top: 20,
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
    fontSize: 30,
    fontFamily: 'Proxima Nova Alt Bold',
    marginTop: 10
  },
  bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  racket: {
    width: 50,
    height: 50,
    marginHorizontal: 20 
  }
});
