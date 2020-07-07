import React, { Component } from 'react';
import { View, Text, StyleSheet, Image , Switch,SafeAreaView, ScrollView, TouchableOpacity, Platform} from 'react-native';
import { LongHeader } from '../components/longHeader';
import { colors } from '../common/colors';
import { images } from '../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RangeSlider from 'rn-range-slider';
import AsyncStorage from '@react-native-community/async-storage';
import AppStatusBar from '../components/AppStatusBar';
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
          seenbyfriends : true,
          switch_matches : true,
          swithch_messages : true,
          swithch_training : true,
          swithch_social : true,
          swithch_vibration : true,
          swithch_sounds : true,
        }
    }
    logout(navigate) {
        if(this.removeItemValue('userToken')) navigate('Signin');
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
        <>
        <AppStatusBar backgroundColor={colors.lightgreen} barStyle={Platform.OS === 'ios' ? 'dark-content':'light-content'}></AppStatusBar>
        <SafeAreaView style={styles.container}>
            <LongHeader title={'Settings'} dark={true} left={colors.lightgreen} route={'Messages'} navigate= {navigate} bcolor = {colors.gray} removeLeft = {true} removeRightIcon= {true} rightText = {'Done'}/>
            <ScrollView  style={styles.scrollView}> 
                <View style={[styles.row, styles.divider_section]}>
                <Text>{''}</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('EditProfile')}>
                    <View style={[styles.row, styles.divider]}>
                        <Image  source={images.user1} style={styles.avatar}></Image>
                        <Text style={styles.text}>{'Edit My Profile'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                </TouchableOpacity>
                    <View style={[styles.row, styles.divider_section, styles.noborder]}>
                        <Text>{''}</Text>
                    </View>
                    <View style={[styles.row,styles.divider_section]}>
                        <Text style={[styles.label, styles.bold]}>{'Discover Settings'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate('LocationSwitch')} >
                        <View style={[styles.row, styles.divider, styles.sub]}>
                            <Text style={styles.label}>{'Location'}</Text>
                            <Text style={styles.text}>{'My Current Location'}{"\n"}<Text style={styles.subtext}>{'Bristal, UK'}</Text></Text>
                            
                        </View>
                    </TouchableOpacity>
                    
                    <View style={[styles.row]}>
                        <Text style={styles.label}>{'Maximum Distance'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={{textAlign : 'right', position: 'absolute', right: 10, top: 10}}>{this.state.dis}{' mile'}</Text>
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
                                labelBackgroundColor = {colors.lightgreen}
                                labelBorderColor = {colors.lightgreen}
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({dis : low})
                                }}
                            />
                    </View>
                    
                    <TouchableOpacity onPress={() => navigate('EditGender')} >
                        <View style={[styles.row, styles.divider, styles.sub]}>
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
                            labelBackgroundColor = {colors.lightgreen}
                                labelBorderColor = {colors.lightgreen}
                            onValueChanged={(low, high, fromUser) => {
                                this.setState({rangeLow: low, rangeHigh: high})
                            }}
                        />
                    </View>
                    <View style={[styles.row,styles.divider_section]}>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.label}>{'Be Seen by Friends'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({seenbyfriends : val})}
                        value = {this.state.seenbyfriends}/>
                    </View>
                    <View style={[styles.row, styles.divider_section, styles.noborder]}>
                        <Text style={{width: '100%', color: colors.gray}}>{'Turning this on will allow your friends to find you on Game On. Turning this off means friends won’t be able to see you on the app.'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider_section]}>
                        <Text style={[styles.label, styles.bold]}>{'Notification'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'New Matches'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({switch_matches : val})}
                        value = {this.state.switch_matches}/>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'Messages'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({swithch_messages : val})}
                        value = {this.state.swithch_messages}/>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'Training'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({swithch_training : val})}
                        value = {this.state.swithch_training}/>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'Social'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({swithch_social : val})}
                        value = {this.state.swithch_social}/>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'In App Vibration'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({swithch_vibration : val})}
                        value = {this.state.swithch_vibration}/>
                    </View>
                    <View style={[styles.row ,styles.sub]}>
                        <Text style={styles.label}>{'In App Sounds'}</Text>
                        <Switch
                        onValueChange = {(val) => this.setState({swithch_sounds : val})}
                        value = {this.state.swithch_sounds}/>
                    </View>
                    <View style={[styles.row, styles.divider_section, {borderTopWidth:0.3,borderTopColor:colors.gray}]}>
                        <Text style={[styles.label, styles.bold]}>{'Contact Us'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Help & Support'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider_section]}>
                        
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Rate Us'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider_section]}>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Leave Feedback'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider_section]}>
                    </View>
                    <View style={[styles.row, styles.divider_section]}>
                        <Text style={[styles.label,styles.bold]}>{'Legal'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'Privacy Policy'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                    <View style={[styles.row, styles.divider, styles.sub]}>
                        <Text style={styles.label}>{'Terms of Service'}</Text>
                        <AntDesign name="right" size={25} color={colors.gray} />
                    </View>
                    <View style={[styles.row, styles.sub]}>
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
                    <View style={[styles.row, styles.divider_section]}>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.btnText}>{'Delete Account'}</Text>
                    </View>
                    <View style={[styles.row, styles.divider_section]}>
                    </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView : {
    // marginTop: -10
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
    color: 'black',
    fontSize: 20,
    fontFamily: 'ProximaNova-Regular'
  },    
  label : {
    flex : 1,
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'ProximaNova-Regular'
  },
  bold: {
      fontSize: 19,
    fontWeight: '700',
    color: colors.gray
  },
  divider : {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.3,
    bottom: 0
    },
    divider_section : {
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.3,
        bottom: 0,
        backgroundColor: '#f8f7f8'
    },
    sub : {
        left:10,
        marginRight: 10
    },
    noborder: {
        borderBottomWidth : 0
    },
    bottomLogo : {
        width : '50%',
        resizeMode : 'contain',
        justifyContent : 'center',
        alignSelf: 'center'
    }
});
