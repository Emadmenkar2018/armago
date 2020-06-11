import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input, CheckBox ,Icon, Button  } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { OpenURLButton } from '../../components/openWebLinking';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
const supportedURL = "https://google.com";
export default class SetDetail extends Component {
    
    state = null;
    constructor(props){
        super(props);
        this.state = {
          phone: '',
          email: '',
          checked1 : false,
          checked2: false
        }
        
    }
    
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                    <View >
                    <View style={styles.main}>
                        <View style={styles.sectionTop}>
                            <Image source={images.logo} style={styles.logo}/>
                            <Text style={styles.tlabel}>{'Enter your details'}</Text>
                        </View>
                        <View style={styles.sectionMiddle}>
                        
                            <Input
                                label = "Email"
                                placeholder="Enter Your Email"
                                style={styles.input}
                                onChangeText={value => this.setState({ email: value })}
                            />
                    
                            <Text style={styles.label}>{'Marketing Consent'}</Text>
                            
                                
                        </View>
                        <View style={styles.sectionMiddleBottom}>
                            <View style={{'flexDirection' : 'row',  flex:1}}>
                                <CheckBox
                                left
                                checkedIcon={<Image source={images.checked} />}
                                uncheckedIcon={<Image source={images.unchecked} />}
                                style={styles.checkbox}
                                checked={this.state.checked1}
                                onPress = {() => this.setState({checked1 : !this.state.checked1})}
                                />
                                <OpenURLButton url={supportedURL}>
                                    <Text style={styles.sublabel}>
                                        <Text>{'By ticking this box you agree to the '}</Text>
                                        
                                            <Text style={{color: colors.biglightBlue}}>{'terms and conditions'}</Text>
                                        <Text>{' of GameOn and to the '}</Text>
                                            <Text style={{color: colors.biglightBlue}}>{'privacy policy'}</Text>
                                    </Text>
                                </OpenURLButton>
                                    
                                
                                
                            </View>
                            <View  style={{'flexDirection' : 'row',  flex:1}}>
                                <CheckBox
                                left
                                checkedIcon={<Image source={images.checked} />}
                                uncheckedIcon={<Image source={images.unchecked} />}
                                checked={this.state.checked2}
                                style={styles.checkbox}
                                onPress = {() => this.setState({checked2 : !this.state.checked2})}
                                />
                                <OpenURLButton url={supportedURL}>
                                    <Text style={styles.sublabel}>{'By ticking this box you agree you would like to receive marketing communications by email'}</Text>
                                </OpenURLButton>
                                    
                                
                            </View>
                        </View>
                        <View style={styles.sectionBottom}>
                            <View style={{ flex:1,alignItems:'flex-start'}}>
                            <Button
                            buttonStyle = {styles.navBtn_prev}
                            icon={
                                <Icon name={"chevron-left"}  size={60} color="#fff" />
                            }
                            onPress = {() => navigate('SetSmsCode')}
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
                </View>
            </KeyboardAwareScrollView>
        
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
      marginVertical: 50
  },
  sectionMiddle: {
    //   flex : 5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20
  },
  sectionMiddleBottom: {
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
      height:50,
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
}
});
