import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card';
import Header from '../components/header';
import Footer from '../components/footer';
import { colors } from '../common/colors';
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');
export default class TrialCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image source={images.group} style={styles.groupImg} />
          <FlipCard 
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            {/* Face Side */}
            <View style={{ flex: 1}}>
                  <Image source={images.trial_front} style={styles.frontimg} />
                  <View style={{ flex: 1,marginHorizontal:20,marginVertical: 15}}>
                    <Text style={[styles.title]}>Advanced Trials</Text>
                    <Text style={[styles.text2, { marginVertical: 6 }]}>Swipe right to Sign Up</Text>
                  </View>
                  <View style={styles.bar}>
                    <View style={{ flexDirection: 'row',marginHorizontal: 10 ,marginVertical: 10}}>
                      <TouchableOpacity style={styles.circle} onPress={() => this.setState({ simpleModal: true })}>
                        <Text style={styles.text3}>MON</Text>
                      </TouchableOpacity>
                    </View>
                    <Image source={images.racket} style={styles.racket} />
                  </View>
                  
            </View>
            {/* Back Side */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.trial_back} style={styles.img} />
                <Text style={styles.text1}>Advanced Trials</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 6 }}>
                <Text style={styles.text}>{"If you are looking to play with the advanced team or advanced squad you will need to swipe right to select the times you are available to come for a trial'"}</Text>
              </View>
            </View>
          </FlipCard>
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  main: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginVertical  : height/20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 60,
  },
  img: {
    width: 80,
    height: 60,
    top:10,
    left:20,
    borderRadius: 20
  },
  frontimg: {
    
    width:'100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 40
  },  
  text: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',
    
    marginHorizontal: 10,
    marginVertical: 20
  },
  text3: {
    color: colors.white,
    fontSize: 13,
    fontFamily: 'ProximaNova-Regular'
  },
  title: {
    color: colors.white,
    fontSize: 25,
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
    fontSize: 18,
    fontWeight: '700',
    left:30,
    top: 10
  },
  text2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    top: 10
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40
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
});
