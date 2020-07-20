/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
export const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as Actions from '../store/actions';

export function LongHeader(props) {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: props.color,
            borderBottomWidth: 0.3,
            borderBottomColor: props.bcolor,
          },
        ]}>
        <View style={styles.top_middle}>
          {props.avatar && <Image source={props.avatar} style={styles.user} />}
          <Text style={[styles.text, props.dark && {color: 'black'}]}>
            {props.title}
          </Text>
          {/* <Text style={styles.text}>{'         '}</Text> */}
        </View>
        {!props.removeLeft && (
          <TouchableOpacity
            onPress={() => props.navigate(props.route)}
            style={{flexDirection: 'row'}}>
            <AntDesign
              name="left"
              size={25}
              color={props.left ? props.left : 'white'}
            />
            <Text style={{color: props.left, top: 3}}>{props.leftText}</Text>
          </TouchableOpacity>
        )}
        {!props.removeRightIcon && (
          <TouchableOpacity onPress={() => console.log('ok')}>
            <AntDesign
              name={props.rightIcon ? props.rightIcon : 'reload1'}
              size={25}
              color={props.left ? props.left : 'white'}
            />
          </TouchableOpacity>
        )}
        {props.removeRightIcon && (
          <View style={styles.top_end}>
            <TouchableOpacity
              onPress={() => {
                dispatch(Actions.saveSetting());
                props.navigate('Home');
              }}>
              <Text style={{color: props.left}}>{props.rightText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'ProximaNova-Bold',
    fontSize: 20,
    left: 5,
  },
  user: {
    width: 40,
    height: 40,
  },
  top_middle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    // position : 'absolute',
    // marginHorizontal : 10,
    // left: responsiveScreenWidth(40),
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_end: {
    flex: 1,
    position: 'absolute',
    right: 15,
  },
});
