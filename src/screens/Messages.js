import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { images } from '../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const { width, height } = Dimensions.get('window');

export default class Messages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={images.oval3} style={styles.oval1} />
        <View style={styles.main}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <AntDesign name="home" size={26} color={"white"} />
            <Image source={images.msg} style={styles.msg} />
            <AntDesign name="home" size={26} color={"white"} style={{ opacity: 0 }} />
          </View>
          <TextInput style={styles.input} placeholder={'🔍 Search 8 matches'} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ color: 'white', fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>New Matches</Text>
            <View style={styles.circle}>
              <Text style={{ color: colors.lightgreen, fontSize: 18, fontWeight: '600' }}>5</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 12, height: 90 }} horizontal>
            <View style={{ paddingRight: 14 }}>
              <Image source={images.user1} style={styles.user} />
              <View style={styles.dot} />
              <Text style={[styles.name, { marginLeft: 10 }]}>Jeffery</Text>
            </View>
            <View style={{ paddingRight: 14 }}>
              <Image source={images.user2} style={styles.user} />
              <View style={styles.dot} />
              <Text style={styles.name}>Alan</Text>
            </View>
            <View style={{ paddingRight: 14 }}>
              <Image source={images.user3} style={styles.user} />
              <View style={styles.dot} />
              <Text style={styles.name}>Leo</Text>
            </View>
            <View style={{ paddingRight: 14 }}>
              <Image source={images.user4} style={styles.user} />
              <View style={styles.dot} />
              <Text style={styles.name}>Chris</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ color: colors.lightgreen, fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>Messages</Text>
            <View style={[styles.circle, { backgroundColor: colors.lightgreen}]}>
              <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600' }}>2</Text>
            </View>
          </View>

          <View style={styles.list}>
            <Image source={images.user6} style={styles.user}/>
            <View style={[styles.dot, { left: 59}]} />
            <View style={styles.listborder}>
              <Text style={{ fontSize: 20, fontFamily: 'Proxima Nova Bold', color: '#666'}}>Mathew</Text>
              <Text style={{ fontSize: 16, fontFamily: 'ProximaNova-Regular', color: '#999'}}>Still up for tonight?</Text>
            </View>
          </View>

          <View style={styles.list}>
            <Image source={images.user7} style={styles.user}/>
            <View style={[styles.dot, { left: 59}]} />
            <View style={styles.listborder}>
              <Text style={{ fontSize: 20, fontFamily: 'Proxima Nova Bold', color: '#666'}}>Mathew</Text>
              <Text style={{ fontSize: 16, fontFamily: 'ProximaNova-Regular', color: '#999'}}>Still up for tonight?</Text>
            </View>
          </View>

          <View style={styles.list}>
            <Image source={images.user8} style={styles.user}/>
            <View style={[styles.dot, { left: 59}]} />
            <View style={styles.listborder}>
              <Text style={{ fontSize: 20, fontFamily: 'Proxima Nova Bold', color: '#666'}}>Mathew</Text>
              <Text style={{ fontSize: 16, fontFamily: 'ProximaNova-Regular', color: '#999'}}>Still up for tonight?</Text>
            </View>
          </View>
          
        </View>
        <Image source={images.oval} style={styles.oval2} />
        

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
    margin: 12
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
  oval1: {
    width: width,
    height: 350,
    position: 'absolute',
    top: -150,
  },
  oval2: {
    width,
    height: 150,
    position: 'absolute',
    bottom: -100,
  },
  msg: {
    width: 40,
    height: 32
  },
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    height: 32,
    padding: 0,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 6
  },
  circle: {
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  user: {
    width: 70,
    height: 70
  },
  dot: {
    backgroundColor: colors.lightgreen,
    borderWidth: 3,
    borderColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 5,
    top: 26,
  },
  name: {
    marginLeft: 20,
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'ProximaNova-Regular'
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    zIndex: 100
  },
  listborder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    marginLeft: 12,
    width: '100%'
  },
});
