import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { colors } from '../common/colors';
import { images } from '../common/images';
export const { width, height } = Dimensions.get('window');
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
export default class TeamCard extends Component {
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
                <Image source={images.group} style={styles.groupImg} />

                <View style={{ flex: 1, padding: 15}}>
                  <Image source={images.trial_front} style={styles.frontimg} />
                  <View style={{ flex: 1,marginHorizontal:20,marginVertical: 15}}>
                    <Text style={[styles.title]}>Bristol Advanced Squad</Text>
                    <Text style={[styles.text2, { marginVertical: 6 }]}>Trains at Coombe Dingle</Text>
                  </View>
                  <View style={styles.bar}>
                    <View style={{ flexDirection: 'row',marginHorizontal: 10 ,marginVertical: 10}}>
                      <TouchableOpacity style={styles.circle} onPress={() => console.log('Mon Clicked')}>
                        <Text style={styles.text3}>MON</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.circle} onPress={() => console.log('Fri Clicked')}>
                        <Text style={styles.text3}>Fri</Text>
                      </TouchableOpacity>
                    </View>
                    <Image source={images.racket} style={styles.racket} />
                  </View>
                </View>
            
                  
            </View>
            {/* Back Side */}
            <View style={styles.main}>
                <Image source={images.group} style={styles.groupImg} />
                <View style={{ flex: 1,flexDirection: 'column', padding: 10}}>
                    <View style={{flex: 1, flexDirection : 'row'}}>
                      <Image source={images.trial_back} style={styles.img} />
                      <Text style={styles.text1}>Bristol Advanced Squad</Text>
                    </View>
                    <Text style={styles.text2}>{"Bristol Advanced Tennis Squad is for people looking to play tennis at a good standard whilst still being able to have a laugh’"}</Text>
                  </View>
                  
                  <View style={{width:'100%',flex: 1, backgroundColor : colors.darkOrange , padding: 15}}>
                    <Text style={styles.text6}>{"Matching"}</Text>
                    <DateView data={'Monday'} value={[0, 1, 0]}/>
                    <DateView data={'Wednesday'} value={[0, 1, 0]}/>
                  </View>
                  <View style={{flex: 1,  padding: 15}}>
                    <Text style={styles.text6}>{"Mutual Friends"}</Text>
                    <View style={{flex: 1, flexDirection : 'row', padding: 15}}>
                      <View style={styles.m_avatar}>
                        <Image source={images.user10} />
                        <Text style={styles.text7}>Jess Jones</Text>
                      </View>
                      <View style={styles.m_avatar}>
                        <Image source={images.user11}/>
                        <Text style={styles.text7}>Jack Norrow</Text>
                      </View>
                    </View>
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
    flexDirection: "column"
  },
  main: {
    flex: 1,
    backgroundColor: colors.orange,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginVertical  : height/20,
    marginHorizontal: 30,
    borderRadius: 60,
  },
  img: {
    width: width / 4.5,
    height: 60,
    top:10,
    left:10,
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
    fontWeight: '700'
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
  text6 : {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700'
  },
  text7: {
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
  },
  m_avatar: {
    flex: 0.2,
    textAlign: 'center',
    padding: 10
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_date: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10
  },
  circle_date : {
    backgroundColor: colors.green,
    width: 35,
    height: 35,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 1
  },
  text_date : {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular'
  }
});
