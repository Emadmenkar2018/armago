import React, { Component,useEffect  } from 'react';
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input, CheckBox, Button ,Icon  } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
export default class SetSmsCode extends Component {
    
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
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.sectionTop}>
                    <Image source={images.logo} style={styles.logo}/>
                    <Text style={styles.tlabel}>{'Please enter the code sent to the number you provided'}</Text>
                </View>
                <View style={styles.sectionMiddle}>
                        <Input
                        label = "Enter Code"
                        placeholder="Code"
                        style={styles.input}
                        onChangeText={value => this.setState({phone: value })}
                        keyboardType={'numeric'}
                        />
                        
                </View>
                <View style={styles.sectionBottom}>
                    <View style={{ flex:1,alignItems:'flex-start'}}>
                    <Button
                    buttonStyle = {styles.navBtn_prev}
                    icon={
                        <Icon name={"chevron-left"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('SetPhone')}
                    />
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end'}}>
                    <Button
                    buttonStyle = {styles.navBtn_next}
                    icon={
                        <Icon name={"chevron-right"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('SetDetail')}
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
      justifyContent: 'flex-start',
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
    color: 'grey',
    fontSize: 20,
    fontWeight: '300',
    top: 20,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center'
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
