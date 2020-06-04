import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../common/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight
} from "react-native-responsive-dimensions";
export function LongHeader(props) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: props.color, borderBottomWidth : 0.3, borderBottomColor : props.bcolor}]}>
          <TouchableOpacity onPress={() => props.navigate(props.route)} style={{'flexDirection' : 'row'}}>
            <AntDesign name="left" size={25} color={props.left ? props.left :"white"} />
            <Text style ={{'color' : props.left, top : 3}}>{props.leftText}</Text>
          </TouchableOpacity>
          <View style={styles.top_middle}>
            <Image source={props.avatar} style={styles.user} />
            <Text style={[styles.text, props.dark && { color: 'black'}]}>{props.title}</Text>
            {/* <Text style={styles.text}>{'         '}</Text> */}
          </View>
          <TouchableOpacity onPress={() => console.log('ok')}>
            <AntDesign name="ellipsis1" size={30} color={props.left ? props.left :"white"} />
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 6
  },
  text: {
    color: 'white',
    fontFamily: "ProximaNova-Bold",
    fontSize: 20,
    left:5
  },
  user: {
    width: 40,
    height: 40
  },
  top_middle:{
    flex: 1,
    alignSelf : 'center',
    // position : 'absolute',
    // marginHorizontal : 10,
    // left: responsiveScreenWidth(40),
    flexDirection: 'row',
    alignItems: 'center',
  }
});
