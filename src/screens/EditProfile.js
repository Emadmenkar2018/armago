import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import { LongHeader } from '../components/longHeader';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../common/colors';
import { images } from '../common/images';
import AppStatusBar from '../components/AppStatusBar';
import { RFValue } from 'react-native-responsive-fontsize';
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
              <Image source={images.woman} style={styles.profile_avatar} />
              <Image source={images.AvatarMask} style={styles.profile_avatar}></Image> 
              <Text style={{color: 'white', fontSize:RFValue(18), fontFamily:'ProximaNova-Bold',fontWeight:'700',position:'absolute',left:40,bottom:'10%'}}>Profile Picture</Text>
          
          </View>
          <View style={styles.middle}>
            <View style = {styles.middle_left}>
            <TouchableOpacity onPress={() => navigate('SportsEdit')}>
                <Image source={images.ProfileSports} style={styles.profile_img} /></TouchableOpacity>
            </View>
            <View style = {styles.middle_right}>
            <TouchableOpacity onPress={() => navigate('BioEdit')}>
              <Image source={images.ProfileBio} style={styles.profile_img} /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.middle}>
            <View style = {styles.middle_left}>
            <TouchableOpacity onPress={() => navigate('AvailabilityEdit')}>
              <Image source={images.ProfileAvaila} style={styles.profile_img} /></TouchableOpacity>
            </View>
            <View style = {styles.middle_right}>
            <TouchableOpacity onPress={() => navigate('TeamsView')}>
              <Image source={images.ProfileTeams} style={styles.profile_img} /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => navigate('AbilityEdit')}>
              <Image source={images.ProfileAbili} style={styles.profile_img} /></TouchableOpacity>
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
    flex: 1,
    flexDirection : 'row',
    // height: 350,
    // backgroundColor: 'red'
    
  },
  top_left : {
    flex : 1,
    padding: 15,
    backgroundColor: 'red'
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    alignSelf : 'center',
    // backgroundColor:'red'
  },
  middle_left : {
    flex: 1,
    // padding:10,
    resizeMode: 'cover',
    // backgroundColor:'yellow'
  },
  middle_right : {
    flex: 1,
  },
  bottom : {
    // flex: 1,
    padding:15,
    justifyContent: 'flex-start',
    // backgroundColor:'red'
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
    flex: 1,
    width: '90%',
    // height:'100%',
      height: '90%',
    borderRadius:40,
    resizeMode: 'cover',
    position:'absolute',
    alignItems:'center',
    justifyContent: 'center',
    margin:'5%'
    // top:0,bottom:0,
    // top:'10%',
    // left:15
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
