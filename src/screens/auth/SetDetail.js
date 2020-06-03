import React, { Component,useCallback   } from 'react';
import { View, Text, StyleSheet, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input, CheckBox ,Icon, Button  } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
  };
const supportedURL = "https://google.com";
export default class SetDetail extends Component {
    
    state = null;
    constructor(props){
        super(props);
        this.state = {
          phone: '',
          email: '',
          checked1 : false,
          checked2: true
        }
        
    }
    
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                    <View style={styles.container}>
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
                                <View style={{'flexDirection' : 'row',  width:'100%'}}>
                                    
                                    <CheckBox
                                    left
                                    checkedIcon={<Image source={images.checked} />}
                                    uncheckedIcon={<Image source={images.unchecked} />}
                                    style={styles.checkbox}
                                    checked={this.state.checked1}
                                    onPress = {() => this.setState({checked1 : !this.state.checked1})}
                                    />
                                    <OpenURLButton url={supportedURL}><Text style={styles.sublabel}>{'By ticking this box you agree to the terms and conditions of GameOn and to the privacy policy'}</Text></OpenURLButton>
                                    
                                    
                                </View>
                                <View  style={{'flexDirection' : 'row', width:'100%'}}>
                                    <CheckBox
                                    left
                                    checkedIcon={<Image source={images.checked} />}
                                    uncheckedIcon={<Image source={images.unchecked} />}
                                    checked={this.state.checked2}
                                    style={styles.checkbox}
                                    onPress = {() => this.setState({checked2 : !this.state.checked2})}
                                    />
                                    <OpenURLButton url={supportedURL}><Text style={styles.sublabel}>{'By ticking this box you agree you would like to receive marketing communications by email'}</Text></OpenURLButton>
                                    
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
      flex : 3,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20
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
      width:'10%',
    alignItems : 'flex-end',
    alignSelf : 'flex-end',
    alignContent : 'flex-end'
  },
  sublabel: {
      width:'40%',
    color: 'grey',
    top:15,
    left:-15,
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
