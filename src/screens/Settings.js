import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LongHeader } from '../components/longHeader';
import { colors } from '../common/colors';
import { images } from '../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {  Slider } from 'react-native-elements';
export default class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
          value: 0,
          min: 0,
          max: 3
        }
      }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <LongHeader title={'Settings'} dark={true} left={colors.lightgreen} route={'Messages'} navigate= {navigate} bcolor = {colors.gray} removeLeft = {true} removeRightIcon= {true} rightText = {'Done'}/>
            <View style={styles.main}>
                <View style={[styles.row, styles.divider]}>
                    <Image  source={images.user1} style={styles.avatar}></Image>
                    <Text style={styles.text}>{'Edit My Profile'}</Text>
                    <AntDesign name="right" size={25} color={colors.gray} />
                </View>
                <View style={[styles.row,styles.divider]}>
                    <Text style={styles.label}>{'Discover Settings'}</Text>
                </View>
                <View style={[styles.row, styles.divider]}>
                    <Text style={styles.label}>{'Location'}</Text>
                    <Text style={styles.text}>{'My Current Location'}{"\n"}<Text style={styles.subtext}>{'Bristal, UK'}</Text></Text>
                    
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.label}>{'Maximum Distance'}</Text>
                    <Text style={styles.text}>{'10mi.'}</Text>
                    <Slider
                        step={1}
                        minimumValue={this.state.min}
                        maximumValue={this.state.max}
                        value={this.state.value}
                        thumbTintColor='#2ecc71'
                        onValueChange={val => this.setState({ value : val })}
                    />
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
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    padding: 10,
    paddingHorizontal : 20,
    flexDirection : 'row',
    alignItems : 'center'
  },
  avatar : {
      width: 40,
      height : 40
  },
  text: {
    flex : 1,
    color: 'grey',
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'ProximaNova-Regular'
  },
  subtext : {
    flex : 1,
    color: 'grey',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'ProximaNova-Regular'
  },
  label : {
    flex : 1,
    color: 'grey',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'ProximaNova-Regular'
  },
  divider : {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.3,
    bottom: 0
    }
});
