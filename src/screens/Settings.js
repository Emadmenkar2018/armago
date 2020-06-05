import React, { Component } from 'react';
import { View, Text, StyleSheet, Image , Switch,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { LongHeader } from '../components/longHeader';
import { colors } from '../common/colors';
import { images } from '../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {  Slider } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import AsyncStorage from '@react-native-community/async-storage';
export default class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
          value: 0,
          min: 0,
          max: 3,
          rangeLow : 18,
          rangeHigh : 20,
          dis : 100,
          seenbyfriends : true
        }
    }
    logout(navigate) {
        console.log(navigate)
        this.removeItemValue('token');
        navigate('Signin');
    }
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <SafeAreaView style={styles.container}>
            <LongHeader title={'Settings'} dark={true} left={colors.lightgreen} route={'Messages'} navigate= {navigate} bcolor = {colors.gray} removeLeft = {true} removeRightIcon= {true} rightText = {'Done'}/>
            <ScrollView  style={styles.scrollView}> 
                
                    <View style={[styles.row, styles.divider]}>
                        <Image  source={images.user1} style={styles.avatar}></Image>
                        <Text style={styles.text}>{'Edit My Profile'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                    <View style={[styles.row,styles.divider]}>
                        <Text style={styles.label}>{'Discover Settings'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate('LocationSwitch')} >
                        <View style={[styles.row, styles.divider]}>
                            <Text style={styles.label}>{'Location'}</Text>
                            <Text style={styles.text}>{'My Current Location'}{"\n"}<Text style={styles.subtext}>{'Bristal, UK'}</Text></Text>
                            
                        </View>
                    </TouchableOpacity>
                    
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Maximum Distance'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={{textAlign : 'right', position: 'absolute', right: 10, top: 10}}>{this.state.dis}{'mile'}</Text>
                            <RangeSlider
                                rangeEnabled = {false}
                                style={{width: '100%', height: 80}}
                                gravity={'top'}
                                min={0}
                                max={1000}
                                initialLowValue = {this.state.dis}
                                step={1}
                                selectionColor= {colors.lightgreen}
                                blankColor= {colors.gray}
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({dis : low})
                                }}
                            />
                    </View>
                    <TouchableOpacity onPress={() => navigate('EditGender')} >
                        <View style={[styles.row]}>
                            <Text style={styles.label}>{'Gender'}</Text>
                            <Text style={styles.text}>{'Select'}</Text>
                            <AntDesign name="right" size={25} color={colors.gray} />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Age Range'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={{textAlign : 'left', position: 'absolute', right: 10, top: 10}}>{this.state.rangeLow} {'~'} {this.state.rangeHigh}</Text>
                        <RangeSlider
                            style={{width: '100%', height: 80, flex: 3}}
                            gravity={'center'}
                            min={18}
                            max={40}
                            initialLowValue = {this.state.rangeLow}
                            initialHighValue = {this.state.rangeHigh}
                            step={1}
                            selectionColor= {colors.lightgreen}
                            blankColor= {colors.gray}
                            onValueChanged={(low, high, fromUser) => {
                                this.setState({rangeLow: low, rangeHigh: high})
                            }}
                        />
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Be Seen by Friends'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({seenbyfriends : val})}
                        value = {this.state.seenbyfriends}/>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={{width: '100%', color: colors.gray}}>{'Turning this on will allow your friends to find you on Game On. Turning this off means friends won’t be able to see you on the app.'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'Notification'}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'New Matches'}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Messages'}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Training'}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Social'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'Training'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'In App Vibration'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({seenbyfriends : val})}
                        value = {this.state.seenbyfriends}/>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'In App Sounds'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({seenbyfriends : val})}
                        value = {this.state.seenbyfriends}/>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'Contact Us'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Help & Support'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Rate Us'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Leave Feedback'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'Legal'}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Privacy Policy'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Terms of Service'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'Liscenses'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                    <View style={[styles.row, styles.divider]}>
                    </View>
                    <TouchableOpacity onPress={() => this.logout(navigate)} >
                        <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Logout'}</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={[styles.row, styles.divider, {flexDirection : 'column'}]}>
                        <Image source={images.logo} style={styles.bottomLogo}></Image>
                        <Text style={{fontSize: 15, color: colors.gray}}>{'Version 1.0.0'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Delete Account'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView : {
    marginTop: -10
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
  btnText : {
      flex : 1,
      width: '100%',
    textAlign : 'center',
    color: 'grey',
    fontSize: 20,
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
    },
    bottomLogo : {
        width : '50%',
        resizeMode : 'contain',
        justifyContent : 'center',
        alignSelf: 'center'
    }
});
