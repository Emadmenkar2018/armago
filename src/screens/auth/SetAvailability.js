import React, { useState,Component  } from 'react';
import { View, Text, StyleSheet, Image, Picker,TouchableOpacity } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input,  Button ,Icon, Slider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
function DateView(props) {
  
  return (
    <View style={styles.item}>
      <View style={styles.btn}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {
          var key = props.data.toString();
            props.object.setState(prevState => ({
              [key] : {                   // object that we want to update
                  ...prevState[key],    // keep all other key-value pairs
                  am: !prevState[key]['am']    // update the value of specific key
              }
          }))
                        }}>
            <View style={[styles.circle, { backgroundColor: props.value.am ? colors.green : colors.red}]}>
              <Text style={styles.text4}>AM</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
                  var key = props.data.toString();
                  props.object.setState(prevState => ({
                    [key] : {                   // object that we want to update
                        ...prevState[key],    // keep all other key-value pairs
                        pm: !prevState[key]['pm']    // update the value of specific key
                    }
                }))
            }}>
          <View style={[styles.circle, { backgroundColor: props.value.pm ? colors.green : colors.red}]}>
            <Text style={styles.text4}>PM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
                  var key = props.data.toString();
                  props.object.setState(prevState => ({
                    [key] : {                   // object that we want to update
                        ...prevState[key],    // keep all other key-value pairs
                        eve: !prevState[key]['eve']    // update the value of specific key
                    }
                }))
            }}>
            <View style={[styles.circle, { backgroundColor: props.value.eve ? colors.green : colors.red}]}>
            <Text style={styles.text4}>EVE</Text>
        </View>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}
export default class SetAvailability extends Component {

    state = null;
    
    constructor(props){
      super(props)
      this.state = {
        Monday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        },
        Tuesday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        },
        Wednesday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        },
        Thursday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        },
        Friday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        },
        Saturday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        },
        Sunday : {
          'am' : 1,
          'pm' : 1,
          'eve' : 1
        }
      }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.sectionTop}>
                    <Image source={images.logo} style={styles.logo}/>
                    <Text style={styles.tlabel}>{'Tap the relevant time and day to update availability. Please put times you are NOT available - you can update later'}</Text>
                </View>
                <View style={styles.sectionMiddle}>
                  <View style={{ marginRight: 0, alignSelf: 'flex-end' }}>
                    <Text style={styles.text2}>{'06:00-12:00    12.00-18.00    18.00-23.00'}</Text>
                  </View>

                  <DateView data={'Monday'} value={this.state.Monday} object={this}/>
                  <DateView data={'Tuesday'} value={this.state.Tuesday} object={this}/>
                  <DateView data={'Wednesday'} value={this.state.Wednesday} object={this}/>
                  <DateView data={'Thursday'} value={this.state.Thursday} object={this}/>
                  <DateView data={'Friday'} value={this.state.Friday} object={this}/>
                  <DateView data={'Saturday'} value={this.state.Saturday} object={this}/>
                  <DateView data={'Sunday'} value={this.state.Sunday} object={this}/>

                  <View style={styles.largeBtn}>
                    <Text style={{ color: 'white', fontFamily: 'ProximaNova-Regular'}}>Save</Text>
                  </View>
                </View>
                <View style={styles.sectionBottom}>
                    <View style={{ flex:1,alignItems:'flex-start'}}>
                    <Button
                    buttonStyle = {styles.navBtn_prev}
                    icon={
                        <Icon name={"chevron-left"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('SetBioUniversity')}
                    />
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end'}}>
                    <Button
                    buttonStyle = {styles.navBtn_next}
                    icon={
                        <Icon name={"chevron-right"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('')}
                    />
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
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top', 
    height: 170,
    fontSize: 14,
    color: '#333'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8
  },
  sectionTop: {
      flex : 1,
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 30,
  },
  sectionMiddle: {
      flex : 3,
      width: '100%',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
  },
  sectionBottom: {
      flex : 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
  },
  logo : {
      flex: 1,
      width:250,
      height: 50,
      resizeMode: 'contain'
  },
  tlabel : {
    color: 'grey',
    textAlign: 'center',
    fontSize: RFValue(12, 580),
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular',
    justifyContent:'center',
    alignItems: 'center'
  },
  label1 : {
    flex: 1,
    color: 'grey',
    fontSize: RFValue(13, 580),
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular',
    marginVertical: 20,
    marginHorizontal: 20
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
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: colors.green,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 1
  },
  text2: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 10,
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular'
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700'
  },
  text4: {
    color: '#ddd',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular'
  }
});
