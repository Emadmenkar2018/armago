import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import { LongHeader } from '../components/longHeader';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../common/colors';
import { images } from '../common/images';
import AppStatusBar from '../components/AppStatusBar';

export default class EditProfile extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <AppStatusBar backgroundColor={colors.lightgreen} barStyle={Platform.OS === 'ios' ? 'dark-content':'light-content'}></AppStatusBar>
      <SafeAreaView style={styles.container}>
        <LongHeader title={'Profile'} color={'white'} left={'green'}  route={'Settings'} navigate= {navigate} dark removeRightIcon/>
        <View style ={styles.main}>
          <View style={styles.top}>
            <View style = {styles.top_left}>
              <Image source={images.woman} style={styles.profile_avatar} />
            </View>
            <View style = {styles.top_right}>
              <View style = {styles.top_right_top}>
              <TouchableOpacity onPress={() => navigate('SportsEdit')}><Image source={images.ProfileSports} style={styles.profile_img} /></TouchableOpacity>
              </View>
              <View style = {styles.top_right_down}>
              <TouchableOpacity onPress={() => navigate('BioEdit')}><Image source={images.ProfileBio} style={styles.profile_img} /></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.middle}>
            <View style = {styles.middle_left}>
            <TouchableOpacity onPress={() => navigate('AvailabilityEdit')}><Image source={images.ProfileAvaila} style={styles.profile_img} /></TouchableOpacity>
            </View>
            <View style = {styles.middle_right}>
            <TouchableOpacity onPress={() => navigate('TeamsView')}><Image source={images.ProfileTeams} style={styles.profile_img} /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => navigate('AbilityEdit')}><Image source={images.ProfileAbili} style={styles.profile_img} /></TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    flexDirection : 'column',
    backgroundColor: colors.darkBlue
  },
  top : {
    flex: 3,
    flexDirection : 'row',
    
  },
  top_left : {
    flex : 2,
    padding: 15
  },
  top_right : {
    flex : 1,
    flexDirection : 'column',
    
  },
  top_right_top : {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15
  },
  top_right_down : {
    flex : 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom : 15
  },
  middle : {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems : 'flex-start',
    alignSelf : 'flex-start'
  },
  middle_left : {
    flex: 1,
    padding:15
  },
  middle_right : {
    flex: 1,
    paddingTop:15,
    paddingRight:15,
    paddingBottom: 15
  },
  bottom : {
    flex: 2,
    padding:15,
    justifyContent: 'flex-end'
  },
  text: {
    color: 'grey',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular'
  },
  text2: {
    color: 'grey',
    fontSize: 21,
    fontFamily: 'ProximaNova-Regular'
  },
  profile_avatar : {
// flex: 1,
width: '100%',
height:'100%',
      // height: 300,
    // borderRadius:50,
    resizeMode: 'contain',
  },
  profile_img : {
    width: '100%',
      // height: 300,
    // borderRadius:50,
    resizeMode: 'contain',
    
    // flex: 1
  },
  item: {
    marginTop: 26,
  },
  bar: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    borderBottomColor: 'grey',
    backgroundColor: '#f8f8f8',
    height: 46,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  bar2: {
    backgroundColor: '#2ecc71',
    height: 48,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  category: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginLeft: 12,
    paddingRight: 12,
    paddingTop: 6
  }
});
