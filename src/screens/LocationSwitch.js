/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../common/colors';
import AppStatusBar from '../components/AppStatusBar';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import APIKit from '../services/api';

import * as Actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';

export default (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  const profile = useSelector((state) => state.main.data.profile);
  const dispatch = useDispatch();

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [address, setAddress] = useState('');
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = () => {
    if (Platform.OS === 'ios') {
      callLocation();
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
            callLocation();
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
  };
  const callLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setLat(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setLong(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
        Geocoder.init('AIzaSyAeKw1f7h01OyvWvCfUKsRyTywseFWOWEk');
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            const fullAddress = json.results[0].formatted_address;
            console.log(fullAddress);
            setAddress(fullAddress);
          })
          .catch((error) => console.warn(error));
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 200000},
    );
  };
  const addNewLocation = () => {
    if (address === '') {
      alert('Please allow permission.');
      getCurrentLocation();
      return;
    }
    if (setting.location.find((lo) => lo.address === address)) {
      Alert.alert('Already exist');
      return;
    }
    APIKit.setSetting({
      ...setting,
      location: [
        ...setting.location,
        {lat: lat, lng: long, address: address, selected: false},
      ],
    }).then((resp) => {
      // console.log(resp);
      dispatch(Actions.setSetting(resp.data));
    });
  };
  const onSelectLocation = (location, index) => {
    var newLocations = setting.location.map((lo, ind) => ({
      ...lo,
      selected: ind === index,
    }));
    APIKit.setSetting({
      ...setting,
      location: newLocations,
    }).then((newSetting) => {
      console.log(newSetting);
      dispatch(Actions.setSetting(newSetting.data));
    });
    APIKit.profile({
      ...profile,
      location,
    }).then((newProfile) => {
      console.log(newProfile);
      dispatch(Actions.setProfile(newProfile.data));
    });
  };
  const onCurrentLocation = () => {
    if (address === '') {
      alert('Please allow permission.');
      getCurrentLocation();
      return;
    }
    APIKit.profile({
      ...profile,
      location: {lat: lat, lng: long, address: address, selected: false},
    }).then((resp) => {
      // console.log(resp);
      dispatch(Actions.setProfile(resp.data));
    });
  };
  const render = () => {
    const {navigate} = props.navigation;
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <LongHeader
            title={'Location'}
            color={'white'}
            bcolor={colors.gray}
            left={'green'}
            route={'Settings'}
            navigate={navigate}
            removeRightIcon
            dark
          />
          <View style={[styles.bar]}>
            <Text style={[styles.text2, {fontSize: 18, paddingTop: 6}]}>
              {'Set Location'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.category}
            onPress={() => onCurrentLocation()}>
            <Text style={styles.text2}>{'Current Location'}</Text>
            {!setting.location.find(
              (lo) => lo.address === profile.location.address,
            ) && <AntDesign name="check" size={20} color={'#007aff'} />}
          </TouchableOpacity>
          {setting.location.map((lo, index) => (
            <TouchableOpacity
              onPress={() => onSelectLocation(lo, index)}
              style={[styles.category, {borderBottomWidth: 0}]}
              key={'location' + index}>
              <Text style={styles.text2}>{lo.address}</Text>
              {lo.address === profile.location.address && (
                <AntDesign name="check" size={20} color={'#007aff'} />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.bar2}
            onPress={addNewLocation}
            disabled={setting.location.length >= 5}>
            <Text
              style={[
                styles.text2,
                {fontSize: 18, paddingTop: 6, color: 'white'},
              ]}>
              {'Add New Location'}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: '#f8f8f8',
              paddingTop: 24,
              paddingHorizontal: 12,
            }}>
            <Text style={styles.text}>
              {
                'Here you can change your location so that you can swipe in a specific area.\n\nPlease note that by changing your location,some cards such as training and event cards speific to you may no longer be seen.\n\nUp to 5 can be saved.'
              }
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  };
  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {},
  text: {
    color: 'grey',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular',
  },
  text2: {
    color: 'grey',
    fontSize: 21,
    fontFamily: 'ProximaNova-Regular',
    width: '90%',
  },
  item: {
    marginTop: 26,
  },
  bar: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor: '#f8f8f8',
    height: 46,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  bar2: {
    backgroundColor: '#2ecc71',
    height: 48,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  category: {
    flexDirection: 'row',
    // height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
  },
});
