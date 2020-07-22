/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Input, Icon, Button} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoding';
import APIKit from '../../services/api';

export default class SetPersonalInfo extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      gender: 'male',
      lat: '',
      long: '',
      address: '',
      showSelected: true,
      monthRange: [
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
      ],

      dayRange: [
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
      ],

      yearRange: [
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
      ],
      resourcePath: {},
      setting: {},
      year: 1970,
      month: 1,
      day: 1,
      photo: null,
      imageUrl: null,
    };
  }

  componentDidMount() {
    var that = this;
    const _monthRange = [];
    const _dayRange = [];
    const _yearRange = [];
    for (let i = 1; i < 13; i++) {
      _monthRange.push({label: i, value: i});
    }
    for (let i = 1; i < 32; i++) {
      _dayRange.push({label: i, value: i});
    }
    for (let i = 1970; i < 2020; i++) {
      _yearRange.push({label: i, value: i});
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      monthRange: _monthRange,
      dayRange: _dayRange,
      yearRange: _yearRange,
    });

    //get profile from server
    APIKit.getprofile().then(
      (response) => {
        console.log('getting profile');
        const data = response.data;
        that.setState({
          firstname: data.firstName,
          lastname: data.lastName,
          gender: data.gender,
        });
      },
      (error) => {
        console.log(error);
      },
    );
    //get current location, lat & long
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  }
  callLocation(it) {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        it.setState({lat: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        it.setState({long: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
        Geocoder.init('AIzaSyAeKw1f7h01OyvWvCfUKsRyTywseFWOWEk');
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            var fullAddress = json.results[0].formatted_address;
            console.log(fullAddress);
            const setting = {
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                address: fullAddress,
              },
              distance: [0, 5],
              gender: [
                {
                  sport: '5f11b3793b64d018d57d5d47',
                  value: 'both',
                },
                {
                  sport: '5f11b3183b64d018d57d5d42',
                  value: 'both',
                },
              ],
              age: [18, 30],
              seen: true,
              notifications: {
                matches: true,
                messages: false,
                training: true,
                socials: false,
                vibrations: true,
                sounds: true,
              },
            };
            APIKit.setSetting(setting).then((resp) => {
              console.log(resp);
              this.setState({setting});
            });
            this.setState({address: fullAddress});
          })
          .catch((error) => console.warn(error));
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 200000},
    );
  }
  fileUpload = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        const data = new FormData();
        data.append('file', {
          uri:
            Platform.OS === 'android'
              ? this.state.photo.uri
              : this.state.photo.uri.replace('file://', ''),
          name: this.state.photo.fileName,
          type: this.state.photo.type,
        });
        console.log(data);
        fetch(
          'http://ec2-35-178-32-220.eu-west-2.compute.amazonaws.com/api/image',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: {image: data},
          },
        )
          .then((response) => response.json())
          .then((json) => {
            console.log('success', json);
            return json.movies;
          })
          .catch((error) => {
            console.error('err', error);
          });
      }
    } catch (e) {
      // error reading value
    }
  };
  imageGalleryLaunch = () => {
    let options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        if (res.uri) {
          this.setState({photo: res});
          this.fileUpload();
        }
      }
    });
  };

  seleted_item() {
    if (this.state.showSelected) {
      return (
        <Image source={images.genderSelected} style={styles.genderSelected} />
      );
    } else {
      return null;
    }
  }
  selected(ge) {
    this.setState({gender: ge});
  }

  next(navigate, email) {
    if (this.state.firstname === '' || this.state.lastname === '') {
      Alert.alert('Please input First Name and Last Name');
    } else {
      // Patch Profile
      var dob = new Date(this.state.year, this.state.month - 1, this.state.day);
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms);

      var age = Math.abs(age_dt.getUTCFullYear() - 1970);

      console.log({
        email: email,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        location: {
          lat: this.state.lat,
          lng: this.state.long,
          address: this.state.address,
        },
        gender: this.state.gender,
        age,
        imageUrl: this.state.imageUrl,
      });
      APIKit.profile({
        email: email,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        location: {
          lat: this.state.lat,
          lng: this.state.long,
          address: this.state.address,
        },
        gender: this.state.gender,
        age,
      }).then(
        (response) => {
          console.log(response);
          navigate('ChooseSports', {email: email});
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const email = this.props.navigation.state.params.email;
    // this.setState({email : email});
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>{'Enter your personal info'}</Text>
          </View>
          <View
            style={
              Platform.OS === 'ios'
                ? {...styles.sectionMiddle, zIndex: 9999}
                : styles.sectionMiddle
            }>
            <Input
              label="First Name"
              placeholder="Enter Your First Name"
              style={styles.input}
              labelStyle={{color: colors.gray, fontWeight: '700', fontSize: 15}}
              value={this.state.firstname}
              onChangeText={(value) => this.setState({firstname: value})}
            />
            <Input
              label="Last Name"
              placeholder="Enter Your Last Name"
              labelStyle={{color: colors.gray, fontWeight: '700', fontSize: 15}}
              style={styles.input}
              onChangeText={(value) => this.setState({lastname: value})}
              value={this.state.lastname}
            />
            <Text
              style={{
                color: colors.gray,
                alignSelf: 'flex-start',
                fontWeight: '700',
                fontSize: 15,
                left: 10,
              }}>
              Date of Birth
            </Text>
            {/* <Date_Picker></Date_Picker> */}
            <View
              style={
                Platform.OS === 'ios'
                  ? {flexDirection: 'row', paddingTop: 10, zIndex: 9999}
                  : {flexDirection: 'row', paddingTop: 10}
              }>
              <View
                style={
                  Platform.OS === 'ios'
                    ? {flex: 1, paddingHorizontal: 10, zIndex: 9999}
                    : {flex: 1, paddingHorizontal: 10}
                }>
                <DropDownPicker
                  items={this.state.dayRange}
                  defaultNull
                  placeholder="DD"
                  containerStyle={
                    Platform.OS === 'ios'
                      ? {height: 40, zIndex: 9999}
                      : {height: 40}
                  }
                  labelStyle={{
                    color: 'grey',
                    fontSize: RFValue(12, 580),
                    alignItems: 'flex-start',
                  }}
                  placeholderStyle={
                    Platform.OS === 'ios'
                      ? {fontWeight: 'bold', zIndex: 9999}
                      : {fontWeight: 'bold'}
                  }
                  onChangeItem={(item) => this.setState({day: item.value})}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <DropDownPicker
                  items={this.state.monthRange}
                  defaultNull
                  placeholder="MM"
                  containerStyle={{height: 40}}
                  labelStyle={{
                    color: 'grey',
                    fontSize: RFValue(12, 580),
                    alignItems: 'flex-start',
                  }}
                  placeholderStyle={{fontWeight: 'bold'}}
                  onChangeItem={(item) => this.setState({month: item.value})}
                />
              </View>
              <View style={{flex: 2, paddingHorizontal: 10}}>
                <DropDownPicker
                  items={this.state.yearRange}
                  defaultNull
                  placeholder="YYYY"
                  containerStyle={{height: 40}}
                  labelStyle={{
                    color: 'grey',
                    fontSize: RFValue(12, 580),
                    alignItems: 'flex-start',
                  }}
                  placeholderStyle={{fontWeight: 'bold'}}
                  onChangeItem={(item) => this.setState({year: item.value})}
                />
              </View>
            </View>
          </View>
          <View style={styles.sectionMiddleBottom}>
            <View style={{flexDirection: 'row', flex: 1, paddingVertical: 10}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text
                  style={{
                    color: colors.gray,
                    alignSelf: 'flex-start',
                    fontWeight: '700',
                    fontSize: 15,
                    left: 10,
                  }}>
                  Profile Picture
                </Text>
                <TouchableOpacity onPress={this.imageGalleryLaunch}>
                  <Image
                    source={
                      this.state.photo == null
                        ? images.AddPicture
                        : {uri: this.state.photo.uri}
                    }
                    style={[styles.racket, {margin: 10}]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text
                  style={{
                    color: colors.gray,
                    alignSelf: 'flex-start',
                    fontWeight: '700',
                    fontSize: 15,
                    left: 10,
                  }}>
                  Gender
                </Text>

                <View style={styles.rgender}>
                  <View style={styles.item}>
                    <View>
                      <TouchableOpacity onPress={() => this.selected('male')}>
                        <Image source={images.genderM} style={styles.racket} />
                      </TouchableOpacity>

                      {this.state.gender === 'male' && this.seleted_item()}
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <TouchableOpacity onPress={() => this.selected('female')}>
                        <Image source={images.genderW} style={styles.racket} />
                      </TouchableOpacity>
                      {this.state.gender === 'female' && this.seleted_item()}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.next(navigate, email)}
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
    marginTop: 8,
  },
  sectionTop: {
    flex: 1,
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
    flex: 1,
    width: '100%',
    zIndex: 2,
  },
  sectionBottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 1,
  },
  logo: {
    flex: 1,
    width: 250,
    //   height:50,
    resizeMode: 'contain',
  },
  tlabel: {
    flex: 1,
    color: 'grey',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular',
  },
  label: {
    width: '100%',
    marginLeft: 25,
    textAlign: 'left',
    fontSize: RFValue(13, 580),
    color: '#86939e',
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular',
  },
  checkbox: {
    width: responsiveScreenWidth(10),
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
  sublabel: {
    width: responsiveScreenWidth(65),
    top: 15,
    left: -25,
    textAlign: 'left',
    fontSize: RFValue(13, 580),
    color: '#86939e',
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular',
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
  item: {
    // flex:1,?
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gender: {
    flexDirection: 'row',
    padding: 10,
  },
  lgender: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rgender: {
    // flex : 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  racket: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  genderSelected: {
    position: 'absolute',
    top: -10,
    left: 0,
    zIndex: -1,
  },
});
