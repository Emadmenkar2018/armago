/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {images} from '../../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export const {width, height} = Dimensions.get('window');
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

import APIKit, {setClientToken} from '../../services/api';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure();
  }
  handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      console.log(userInfo.user.name);
      console.log(userInfo.user.email);
      console.log(userInfo.user.id);
      console.log(userInfo.user.photo);
      const {navigate} = this.props.navigation;
      APIKit.social_login({
        provider: 'google',
        identifier: userInfo.user.id,
      })
        .then((resp) => {
          if (!resp || resp.errors) {
            navigate('SetDetailOAuth', {
              provider: 'google',
              email: userInfo.user.email,
              idToken: userInfo.idToken,
              googleId: userInfo.user.id,
            });
          } else {
            setClientToken(resp.token);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('signin cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('signin play service not available');
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('unknown error');
        console.log(error);
      }
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image source={images.logo} style={styles.logo} />

          <View style={[styles.btn, {backgroundColor: '#3d589a'}]}>
            <AntDesign
              name="facebook-square"
              size={24}
              color="white"
              style={{marginHorizontal: 12}}
            />
            <Text style={{color: 'white'}}>Sign up with Facebook</Text>
          </View>

          <TouchableOpacity
            onPress={this.handleGoogleSignIn}
            style={styles.btn}>
            <AntDesign
              name="google"
              size={24}
              color="white"
              style={{marginHorizontal: 12}}
            />
            <Text style={{color: 'white', marginLeft: 12}}>
              Sign up with Google
            </Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <View
              style={[
                styles.btn,
                {backgroundColor: '#f0f0f0', borderWidth: 0.3},
              ]}>
              <FontAwesome
                name="apple"
                size={24}
                color="black"
                style={{marginHorizontal: 12}}
              />
              <Text style={{color: 'black', marginLeft: 24}}>
                Sign in with Apple
              </Text>
            </View>
          )}
          <Text style={styles.text1}>{'- Or -'}</Text>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => navigate('SetPhone')}>
            <View
              style={[
                styles.btn,
                {backgroundColor: '#f0f0f0', borderWidth: 0.3},
              ]}>
              <FontAwesome
                name="phone"
                size={24}
                color="black"
                style={{marginHorizontal: 12}}
              />
              <Text style={{color: 'black', marginLeft: 24}}>Phone Number</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image source={images.bottombar} style={styles.oval} />
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
  },
  text1: {
    color: 'grey',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  oval: {
    width,
    height: 300,
    position: 'absolute',
    bottom: -150,
  },
  logo: {
    width: 300,
    height: 70,
    marginBottom: 40,
    marginTop: -100,
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
    width: 220,
    height: 40,
    backgroundColor: colors.red,
    marginTop: 12,
  },
});
