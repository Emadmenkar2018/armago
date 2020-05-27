import React, { useState,Component  } from 'react';
import { View, Text, StyleSheet, Image, Platform,TouchableOpacity } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input,  Button ,Icon, Slider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class ChooseAbility extends Component {
    
    state = null;
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 3
    }
    this.state1 = {
      value: 1,
      min: 0,
      max: 3
    }
  }
    

    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.sectionTop}>
                    <Image source={images.logo} style={styles.logo}/>
                    <Text style={styles.tlabel}>{'Choose Ability'}</Text>
                    <Text style={styles.tlabel}>{'_'}</Text>
                    <Text style={styles.sublabel}>{'We’ll match you with players of a similar skill level. Select your rough ability.'}</Text>
                </View>
                <View style={styles.sectionMiddle}>
                    <View style={{ flexDirection: 'row',  alignItems: 'center'}}>
                        <Image source={images.racket} style={styles.racket}/>
                        <Text style={styles.mlabel}>{'Tennis'}</Text>
                    </View>
                    <Slider
                        step={1}
                        minimumValue={this.state.min}
                        maximumValue={this.state.max}
                        value={this.state.value}
                        thumbTintColor='#2ecc71'
                        onValueChange={val => this.setState({ value : val })}
                    />
                    <View style={styles.textCon}>
                        <Text style={styles.label}>Beginner</Text>
                        <Text style={styles.label}>Intermediate</Text>
                        <Text style={styles.label}>Advanced</Text>
                        <Text style={styles.label}>Team</Text>
                    </View>
                    <View style={{ flexDirection: 'row',  alignItems: 'center', marginTop:10}}>
                        <Image source={images.cycling} style={styles.racket}/>
                        <Text style={styles.mlabel}>{'Cycling'}</Text>
                    </View>
                    <Slider
                        step={1}
                        minimumValue={this.state1.min}
                        maximumValue={this.state1.max}
                        value={this.state1.value}
                        thumbTintColor='#2ecc71'
                        onValueChange={val => this.setState1({ value : val })}
                    />
                    <View style={styles.textCon}>
                        <Text style={styles.label}>Beginner</Text>
                        <Text style={styles.label}>Intermediate</Text>
                        <Text style={styles.label}>Advanced</Text>
                        <Text style={styles.label}>Team</Text>
                    </View>
                </View>
                <View style={styles.sectionBottom}>
                    <View style={{ flex:1,alignItems:'flex-start'}}>
                    <Button
                    buttonStyle = {styles.navBtn_prev}
                    icon={
                        <Icon name={"chevron-left"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('ChooseSports')}
                    />
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end'}}>
                    <Button
                    buttonStyle = {styles.navBtn_next}
                    icon={
                        <Icon name={"chevron-right"}  size={60} color="#fff" />
                    }
                    onPress = {this.next}
                    />
                    </View>
                </View>
            </View>
        </View>
        );
    }
    next() {
        console.log('next clicked')
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
      width: '100%',
      justifyContent: 'flex-start',
      paddingHorizontal: 20
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
mlabel: {
    alignItems: 'center',
    fontSize: 18,
    left: 10
  },
  racket: {
    width: 40,
    height: 40,
  },
  textCon: {
    flexDirection: 'row',
      justifyContent: 'space-between'
  },
  label: {
    alignItems: 'center',
    fontSize: 15
  }
});
