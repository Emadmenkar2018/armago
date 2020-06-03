import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { colors } from '../common/colors';
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
function DateView(props) {
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.circle_date, { backgroundColor: props.value[0] ? colors.green : colors.red}]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View style={[styles.circle_date, { backgroundColor: props.value[1] ? colors.green : colors.red}]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View style={[styles.circle_date, { backgroundColor: props.value[2] ? colors.green : colors.red}]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  )
}
export default class EventCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlipCard 
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            {/* Face Side */}
            <View style={styles.main}>
                <Image source={images.group} style={styles.groupImg}/>
                <View style={{ flex: 1, padding: 15}}>
                  <Image source={images.grape} style={styles.img}/>
                  <View style={{ flex: 1,marginHorizontal: 20 ,marginVertical: 15}}>
                      <Text style={[styles.title]}>Bristol Tennis Social</Text>
                      <Text style={[styles.text2]}>{'Family Social\nGravity'}</Text>
                      <Text style={styles.text2}>{'Swipe to join - Exclusive to app users'}</Text>
                  </View>
                  <View style={styles.bar}>
                      <View style={{ flexDirection: 'row',marginHorizontal: 10 ,marginVertical: 10}}>
                          <View style={styles.circle}>
                            <Text style={styles.text3}>SAT</Text>
                          </View>
                          <Text style={styles.text2}>8PM</Text>
                      </View>
                      <Image source={images.racket} style={styles.racket}/>
                  </View>
                </View>
                
            </View>
            {/* Back Side */}
            <View style={styles.main}>
                <Image source={images.group} style={styles.groupImg} />
                <View style={{ flex: 1,flexDirection: 'column', padding: 10}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={images.grape} style={styles.img_back} />
                    <Text style={styles.text1}>Advanced Trials</Text>
                  </View>
                  <Text style={styles.text2}>{"If you are looking to play with the advanced team or advanced squad you will need to swipe right to select the times you are available to come for a trial'"}</Text>
                </View>
            </View>
            
          </FlipCard>
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
    backgroundColor: colors.lightBlue,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginHorizontal: 30,
    borderRadius: 60,
  },
  circle: {
    backgroundColor: colors.green,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  img: {
    flex: 1.5,
    width:'100%',
    // height: 200,
    marginVertical: 10,
    borderRadius: 50,
    resizeMode: 'cover'
  },
  img_back : {
    width: 80,
    height: 60,
    top:10,
    left:20,
    borderRadius: 20
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular'
  },
  title: {
    color: colors.white,
    fontSize: RFValue(23, 580),
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700'
  },
  bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  racket: {
    width: 50,
    height: 50,
    marginHorizontal: 10 
  },
  text1: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '700',
    left:20,
    top:15
  },
  text2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    top: 10
  },
  text3: {
    color: colors.white,
    fontSize: 13,
    fontFamily: 'ProximaNova-Regular'
  }
});
