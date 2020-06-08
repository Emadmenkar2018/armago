import React, { useState,Component  } from 'react';
import { View, Text, StyleSheet, Image, Platform,TouchableOpacity, Alert } from 'react-native';
import { colors } from '../common/colors';
import { images } from '../common/images';
import { LongHeader } from '../components/longHeader';
import { Input,  Button ,Icon  } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class SportsEdit extends Component {
    
    state = null;
    constructor(props){
        super(props);
        this.state = {
            showSelected : false
        }
    }
    
    seleted_item (){
        if(this.state.showSelected){
            return (
            <Image source={images.sport_selected} style={styles.sport_selected}></Image>
            );
        }
        else{
            return null;
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <LongHeader title={'Sports'} color={colors.lightgreen} bcolor={colors.red} route={'EditProfile'} navigate= {navigate} removeRightIcon/>
            <View style={styles.main}>
                <View style={styles.sectionTop}>
                    <Image source={images.logo} style={styles.logo}/>
                    <Text style={styles.tlabel}>{'Choose which sports '}</Text>
                    <Text style={styles.tlabel}>{'you’d like to play'}</Text>
                    <Text style={styles.tlabel}>{'_'}</Text>
                    <Text style={styles.sublabel}>{'We’ll be adding more sports soon'}</Text>
                </View>
                <View style={styles.sectionMiddle}>
                    <View style={styles.middleSection}>
                        <View style={styles.item}>
                            <View>
                                <Image source={images.sports_gym}></Image>
                                <Text style={styles.sports_label}>{'Gym'}</Text>
                            </View>
                            <Image source={images.sport_comiong_soon} style={{position:'absolute',top:0}}></Image>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                showSelected : !this.state.showSelected
                            });
                        }}>
                            <View style={styles.item}>
                                <View>
                                    {this.seleted_item()}
                                    <Image source={images.sports_racket}></Image>
                                    <Text style={styles.sports_label}>{'Tennis'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                        <View style={styles.item}>
                            <View>
                                <Image source={images.sports_runner}></Image>
                                <Text style={styles.sports_label}>{'Running'}</Text>
                            </View>
                            <Image source={images.sport_comiong_soon} style={{position:'absolute',top:0}}></Image>
                        </View>
                    </View>
                    <View style={styles.middleSection}>
                        <View style={styles.item}>
                            <View >
                                
                                <Image source={images.sports_basketball}></Image>
                                <Text style={styles.sports_label}>{'Basketball'}</Text>
                            </View>
                            <Image source={images.sport_comiong_soon} style={{position:'absolute',top:0}}></Image>
                            
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Image source={images.sports_cycling}></Image>
                                <Text style={styles.sports_label}>{'Cycling'}</Text>
                            </View>
                            <Image source={images.sport_comiong_soon} style={{position:'absolute',top:0}}></Image>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionBottom}>
                    
                    <View style={{width:'100%',borderRadius: 20}}>
                        <TouchableOpacity style={styles.circle} onPress={() => (this.state.showSelected) ? navigate('EditProfile') : Alert.alert('select at least one')}>
                        <Text style={{color: '#fff', fontSize: 18}}>Save</Text>
                        </TouchableOpacity>
                    </View>
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
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8
  },
  sectionTop: {
      flex : 2,
      alignItems: 'center',
      marginHorizontal: 50,
      marginVertical: 50
  },
  sectionMiddle: {
      flex : 3,
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20
  },
  middleSection : 
  {
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  item: {
        marginHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
  },
  coming_label : {
    position: 'absolute'
  },
  sports_label : {
    fontSize: RFValue(12, 580),
    color: 'grey',
    textAlign: 'center',
    marginTop: 20
  },
  sport_selected : {
    position : 'absolute',
    top:-13,
    left:-13
  },
  sectionBottom: {
      flex : 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20
  },
  logo : {
      flex: 3,
      width:250,
      height:50,
      resizeMode: 'contain'
  },
  tlabel : {
    flex: 1,
    color: 'grey',
    fontSize: RFValue(14, 580),
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular'
  },
  sublabel : {
    // flex: 1,
    color: 'grey',
    fontSize: RFValue(12, 580),
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular'
 },
  input : {
      width: '100%'
  },
  navBtn_prev: {
      width: 80,
      height: 80,
      backgroundColor: colors.red,
      borderRadius: 50
  },
  navBtn_next: {
    width: 80,
    height: 80,
    backgroundColor: colors.lightgreen,
    borderRadius: 50
},
circle: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 50,
    
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1
  }
});
