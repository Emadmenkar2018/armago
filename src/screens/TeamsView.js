import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {LongHeader} from '../components/longHeader';
import { images } from '../common/images';

export default class TeamsView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LongHeader title={'Teams'} color={'#e67e22'}/>
        <View style={styles.main}>
          <Text style={styles.text}>{'Here are the teams you have joined training with:'}</Text>
          <View style={styles.item}>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Image source={images.racket} style={styles.racket}/>
              <Text style={styles.text2}>{'Tennis - KCL Tennis'}</Text>
            </View>
            <Image source={images.remove} style={styles.racket}/>
          </View>
        </View>
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
    alignItems: 'center',
    margin: 20
  },
  text: {
    color: 'grey',
    fontSize: 17,
    fontFamily: "ProximaNova-Bold"
  },
  text2: {
    color: 'grey',
    fontSize: 17,
    marginLeft: 10,
    fontFamily: 'ProximaNova-Regular'
  },
  item: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center'
  },
  racket: {
    width: 40,
    height: 40,
  }
});
