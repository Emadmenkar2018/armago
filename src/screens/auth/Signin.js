import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity } from 'react-native';
import { images } from '../../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import AsyncStorage from '@react-native-community/async-storage';
export const { width, height } = Dimensions.get('window');

export default class Signin extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image source={images.logo} style={styles.logo}/>

          <View style={[styles.btn, { backgroundColor: '#3d589a'}]}>
            <AntDesign name="facebook-square" size={24} color="white" style={{ marginHorizontal: 12}}/>
            <Text style={{ color: 'white'}}>Sign up with Facebook</Text>
          </View>

          <View style={styles.btn}>
            <AntDesign name="google" size={24} color="white" style={{ marginHorizontal: 12}}/>
            <Text style={{ color: 'white', marginLeft: 12}}>Sign up with Google</Text>
          </View>

          <Text style={styles.text1}>{'- Or -'}</Text>
          <TouchableOpacity style={styles.circle} onPress={() => navigate('SetPhone')}>
            <View style={[styles.btn, { backgroundColor: '#f0f0f0', borderWidth: 0.3,}]}>
              <FontAwesome name="phone" size={24} color="black" style={{ marginHorizontal: 12}}/>
              <Text style={{ color: 'black', marginLeft: 24}}>Phone Number</Text>
            </View>
          </TouchableOpacity>
          

        </View>
        <Image source={images.bottombar} style={styles.oval}/>

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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  text: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center'
  },
  text1: {
    color: 'grey',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  oval: {
    width,
    height: 300,
    position: 'absolute',
    bottom: -150,
  },
  logo: {
    width: 300,
    height: 70,
    marginBottom: 40,
    marginTop: -100
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
    width: 220,
    height: 40,
    backgroundColor: colors.red,
    marginTop: 12,
  }
});
