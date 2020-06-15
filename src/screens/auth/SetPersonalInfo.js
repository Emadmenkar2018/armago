import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input, CheckBox ,Icon, Button  } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { OpenURLButton } from '../../components/openWebLinking';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker'
import { SafeAreaView } from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
function Date_Picker(){
    const [date, setDate] = useState(new Date())

    return (
        <DatePicker
        date={date}
        mode = {'date'}
        onDateChange={setDate}
        />
    )
}
export default class SetPersonalInfo extends Component {
    
    
    state = null;
    constructor(props){
        super(props);
        this.state = {
          firstname: '',
          lastname: '',
          gender: 'M',
          showSelected : true,
          monthRange :
          [
              {label: 'Item 1', value: 'item1'},
              {label: 'Item 2', value: 'item2'},
          ],
      
          dayRange :
          [
              {label: 'Item 1', value: 'item1'},
              {label: 'Item 2', value: 'item2'},
          ],
      
          yearRange :
          [
              {label: 'Item 1', value: 'item1'},
              {label: 'Item 2', value: 'item2'},
          ]
        }
        
    }
    componentDidMount(){
        const _monthRange = [];
        const _dayRange = [];
        const _yearRange = [];
        for( let i=1; i< 13; i++){
            _monthRange.push({label : i, value : i})
        }
        for( let i=1; i< 32; i++){
            _dayRange.push({label : i, value : i})
        }
        for( let i=1970; i< 2020; i++){
            _yearRange.push({label : i, value : i})
        }
        this.setState({monthRange : _monthRange, dayRange: _dayRange, yearRange : _yearRange})
    }

    seleted_item (){
        if(this.state.showSelected){
            return (
            <Image source={images.genderSelected} style={styles.genderSelected}></Image>
            );
        }
        else{
            return null;
        }
    }
    selected(ge){
      this.setState({gender : ge})
    }
    
    render() {
        
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                    <View style={styles.main}>
                        <View style={styles.sectionTop}>
                            <Image source={images.logo} style={styles.logo}/>
                            <Text style={styles.tlabel}>{'Enter your personal info'}</Text>
                        </View>
                        <View style={styles.sectionMiddle}>
                        
                            <Input
                                label = "FirstName"
                                placeholder="Enter Your First Name"
                                style={styles.input}
                                labelStyle={{color:colors.gray,fontWeight:'700',fontSize:15}}
                                onChangeText={value => this.setState({ firstname: value })}
                            />
                            <Input
                                label = "LastName"
                                placeholder="Enter Your Last Name"
                                labelStyle={{color:colors.gray,fontWeight:'700',fontSize:15}}
                                style={styles.input}
                                onChangeText={value => this.setState({ lastname: value })}
                            />
                            <Text style={{color:colors.gray,alignSelf:'flex-start',fontWeight:'700',fontSize:15,left:10}}>Date of Birth</Text>
                            {/* <Date_Picker></Date_Picker> */}
                            <View style={{flexDirection: 'row',paddingTop: 10}}>
                                <View style={{flex:1, paddingHorizontal:10}}>
                                    <DropDownPicker
                                    items={this.state.dayRange}
                                    defaultNull
                                    placeholder = "DD"
                                    containerStyle={{height: 40}}
                                    labelStyle = {{color:'grey', fontSize: RFValue(12, 580),alignItems : 'flex-start'}}
                                    placeholderStyle={{fontWeight: 'bold'}}
                                    onChangeItem={item => console.log(item.label, item.value)}
                                    />
                                </View>
                                <View style={{flex:1, paddingHorizontal:10}}>
                                    <DropDownPicker
                                        items={this.state.monthRange}
                                        defaultNull
                                        placeholder = "MM"
                                        containerStyle={{height: 40}}
                                        labelStyle = {{color:'grey', fontSize: RFValue(12, 580),alignItems : 'flex-start'}}
                                        placeholderStyle={{fontWeight: 'bold'}}
                                        onChangeItem={item => console.log(item.label, item.value)}
                                    />
                                </View>
                                <View style={{flex:2, paddingHorizontal:10}}>
                                    <DropDownPicker
                                        items={this.state.yearRange}
                                        defaultNull
                                        placeholder = "YYYY"
                                        containerStyle={{height: 40}}
                                        labelStyle = {{color:'grey', fontSize: RFValue(12, 580),alignItems : 'flex-start'}}
                                        placeholderStyle={{fontWeight: 'bold'}}
                                        onChangeItem={item => console.log(item.label, item.value)}
                                    />
                                </View>
                            </View>
                            
                        </View>
                        <View style={styles.sectionMiddleBottom}>
                            <View style={{flexDirection: 'row', flex:1, paddingVertical:10}}>
                                <View style={{flex:1, flexDirection: 'column'}}>
                                    <Text style={{color:colors.gray,alignSelf:'flex-start',fontWeight:'700',fontSize:15,left:10}}>Profile Picture</Text>
                                    <Image source={images.AddPicture}  style={[styles.racket,{margin: 10} ]}/>
                                </View>
                                <View style={{flex:1, flexDirection: 'column'}}>
                                    <Text style={{color:colors.gray,alignSelf:'flex-start',fontWeight:'700',fontSize:15,left:10}}>Gender</Text>
                                    
                                        <View  style = {styles.rgender}>
                                            <View style={styles.item}>
                                                <View>
                                                    <TouchableOpacity onPress={() => this.selected('M')}>
                                                    <Image source={images.genderM} style={styles.racket} /> 
                                                    </TouchableOpacity>
                                                    
                                                    {this.state.gender == 'M' && this.seleted_item()}
                                                </View>
                                            </View>
                                            <View style={styles.item}>
                                                <View>
                                                <TouchableOpacity onPress={() => this.selected('W')}>
                                                <Image source={images.genderW} style={styles.racket} />
                                                </TouchableOpacity>
                                                {this.state.gender == 'W' && this.seleted_item()}
                                                </View>
                                            </View>
                                        </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sectionBottom}>
                            <View style={{ flex:1,alignItems:'flex-start'}}>
                            <Button
                            buttonStyle = {styles.navBtn_prev}
                            icon={
                                <Icon name={"chevron-left"}  size={60} color="#fff" />
                            }
                            onPress = {() => navigate('SetDetail')}
                            />
                            </View>
                            <View style={{ flex:1,alignItems:'flex-end'}}>
                            <Button
                            buttonStyle = {styles.navBtn_next}
                            icon={
                                <Icon name={"chevron-right"}  size={60} color="#fff" />
                            }
                            onPress = {() => navigate('ChooseSports')}
                            />
                            </View>
                        </View>
                </View>
            </SafeAreaView>
        
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
      flex : 1,
      alignItems: 'center',
      marginHorizontal: 50,
    //   marginVertical: 50
  },
  sectionMiddle: {
    //   flex : 5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
  },
  sectionMiddleBottom: {
      flex:1,
      width : '100%'
  },
  sectionBottom: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
  },
  logo : {
      flex: 1,
      width:250,
    //   height:50,
      resizeMode: 'contain'
  },
  tlabel : {
    flex: 1,
    color: 'grey',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular'
  },
  label : {
        width: '100%',
        marginLeft: 25,
        color: 'grey',
        textAlign: 'left',
        fontSize: RFValue(13, 580),
        color: '#86939e',
        fontWeight: '300',
        fontFamily: 'ProximaNova-Regular'
  },
  checkbox : {
      width:responsiveScreenWidth(10),
    alignItems : 'flex-end',
    alignSelf : 'flex-end',
    alignContent : 'flex-end'
  },
  sublabel: {
    width:responsiveScreenWidth(65),
    color: 'grey',
    top:15,
    left:-25,
    textAlign: 'left',
    fontSize: RFValue(13, 580),
    color: '#86939e',
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
item: {
    // flex:1,?
    marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
  },
  gender: {
    flexDirection : 'row',
    padding: 10
  },
  lgender : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'center'
  },
  rgender : {
    // flex : 1,
    paddingVertical:10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'center'
  },
  racket : {
    width: 50,
    height: 50,
    marginHorizontal: 5
  },
  genderSelected : {
    position : 'absolute',
    top:-10,
    left:0,
    zIndex : -1
  }
});
