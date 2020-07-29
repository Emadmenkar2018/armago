/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Input, Button, Icon} from 'react-native-elements';
import APIKit, {setClientToken} from '../../services/api';

export default class SetSmsCode extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      phone: '',
      checked1: false,
      checked2: true,
    };
  }
  next(navigate, phone) {
    if (this.state.code === '') {
      Alert.alert('Please verify your phone with the code');
    } else {
      const payload = {phone: phone, code: this.state.code};
      console.log(payload);
      APIKit.verifyCode(payload)
        .then(({data}) => {
          console.log(data);
          if (!data.existed) {
            // set user Phone in LocatStorage
            navigate('SetDetail', {phone: phone});
          } else {
            //login with that phone number
            APIKit.login({identifier: phone, provider: 'local'})
              // eslint-disable-next-line no-shadow
              .then(({data}) => {
                console.log(data);
                const token = data.token;
                //set token to call other api
                setClientToken(token);
                const user = data.user;
                const fullfilled = user.fullfilled;
                !fullfilled ? navigate('SetPersonalInfo') : navigate('Home');
              })
              .catch((error) => {
                console.log(error && error.response);
              });
          }
        })
        .catch(() => {
          Alert.alert('Please check that your phone number is correct');
        });
    }
  }
  resendCode(phoneNumber) {
    const payload = {phone: phoneNumber};
    APIKit.sendSMSCode(payload)
      .then(({data}) => {
        console.log(data);
        // if(data.success) navigate('SetSmsCode', phone);
      })
      .catch(() => {
        Alert.alert('Something went wrong');
      });
  }
  render() {
    const {navigate} = this.props.navigation;
    const phoneNumber = this.props.navigation.state.params.phone;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>
              {'Please enter the code sent to the number you provided'}
            </Text>
          </View>
          <View style={styles.sectionMiddle}>
            <Input
              label="Enter Code"
              placeholder="Code"
              style={styles.input}
              onChangeText={(value) => this.setState({code: value})}
              keyboardType={'numeric'}
            />
            <Text>Didn't receive?</Text>
            <TouchableOpacity onPress={() => this.resendCode(phoneNumber)}>
              <Text
                style={{color: colors.lightBlue, fontSize: 20, marginTop: 10}}>
                Resend the code
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('SetPhone')}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.next(navigate, phoneNumber)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 8,
  },
  sectionTop: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  sectionBottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    flex: 1,
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    color: 'grey',
    fontSize: 20,
    fontWeight: '600',
    top: 20,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  navBtn_prev: {
    width: 80,
    height: 80,
    backgroundColor: colors.red,
    borderRadius: 50,
  },
  navBtn_next: {
    width: 80,
    height: 80,
    backgroundColor: colors.lightgreen,
    borderRadius: 50,
  },
});
