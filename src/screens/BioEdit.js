import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button,TouchableOpacity } from 'react-native';
import { LongHeader } from '../components/longHeader';
import { colors } from '../common/colors';
import { images } from '../common/images';
import { Slider } from 'react-native-elements';

export default class BioEdit extends Component {
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
        <LongHeader title={'Bio'} color={colors.red} bcolor={colors.red} route={'EditProfile'} navigate= {navigate} />
            <View style={styles.main}>
                <View style={styles.sectionTop}>
                    <Image source={images.logo} style={styles.logo}/>
                    <Text style={styles.tlabel}>{'Bio and University'}</Text>
                </View>
                <View style={styles.sectionMiddle}>
                  <Input
                      label = "Bio"
                      multiline
                      placeholder='Describe yourself and your sporting ability. E.g. I’m in first year and I’m a social tennis player who likes to play twice a week.'
                      style={styles.input}
                       onChangeText={value => this.setState({ bio: value })}
                  />
                  <DropDownPicker
                      items={[
                          {label: 'Item 1', value: 'item1'},
                          {label: 'Item 2', value: 'item2'},
                      ]}
                      defaultNull
                      placeholder = "Select your university"
                      containerStyle={{height: 40}}
                      labelStyle = {{color:'grey', fontSize: RFValue(12, 580),alignItems : 'flex-start'}}
                      placeholderStyle={{fontWeight: 'bold'}}
                      onChangeItem={item => console.log(item.label, item.value)}
                  />
                  <Text style={styles.label1}>{'We will be adding more universities soon'}</Text>
                </View>
                <View style={styles.sectionBottom}>
                    <View style={{ flex:1,alignItems:'flex-start'}}>
                    <Button
                    buttonStyle = {styles.navBtn_prev}
                    icon={
                        <Icon name={"chevron-left"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('ChooseAbility')}
                    />
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end'}}>
                    <Button
                    buttonStyle = {styles.navBtn_next}
                    icon={
                        <Icon name={"chevron-right"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('SetAvailability')}
                    />
                    </View>
                </View>
            </View>
      </View>
    );
  }
  _handlePress() {
    console.log('clicked')
  }
  setState1(value) {
    this.state1 = value
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
  textCon: {
    flexDirection: 'row',
      justifyContent: 'space-between'
  },
  label: {
    alignItems: 'center',
    fontSize: 15
  },
  mlabel: {
    alignItems: 'center',
    fontSize: 18,
    left: 10
  },
  text: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '700'
  },
  text2: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 15,
    fontWeight: '300',
    marginTop: 12,
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
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  racket: {
    width: 40,
    height: 40,
  },
  circle: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 50,
    
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1
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
    color: '#333',
  },
  sectionTop: {
      flex : 2,
      alignItems: 'center',
      marginHorizontal: 50,
      marginVertical: 50
  },
  sectionMiddle: {
      flex : 4,
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
  }
});
