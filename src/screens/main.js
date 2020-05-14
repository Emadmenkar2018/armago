import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header, { width } from '../components/header';
import Footer from '../components/footer';
import { colors } from '../common/colors';
import { images } from '../common/images';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.main}>
            <Image source={images.group} style={styles.groupImg}/>
            <Image source={images.woman} style={styles.img}/>
            <View style={{ flex: 1, marginLeft: 6}}>
                <Text style={styles.title}>Alisha, 20</Text>
                <Text style={[styles.text, { marginVertical: 6}]}>Intermediate</Text>
                <Text style={styles.text}>{'Studies at University of Bristol \n2 Miles Away'}</Text>
            </View>
            <View style={styles.bar}>
                <View style={{ flexDirection: 'row'}}>
                    <View style={styles.circle}>
                    <Text style={styles.text}>MON</Text>
                    </View>
                    <View style={styles.circle}>
                    <Text style={styles.text}>WED</Text>
                    </View>
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
    backgroundColor: colors.darkBlue,
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
    fontWeight: '700'
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700'
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
