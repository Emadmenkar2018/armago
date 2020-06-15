import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,  Modal, TouchableOpacity ,Dimensions, LayoutAnimation, Platform} from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import { colors } from '../common/colors';
import { images } from '../common/images';
import { BlurView } from "@react-native-community/blur";
import FlipCard from 'react-native-flip-card';
import {  RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import TrialCard from './TrialCard';
import TeamCard from './TeamCard';
import TrainingCard from './TrainingCard';
import EventCard from './EventCard';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight
} from "react-native-responsive-dimensions";
import OutOfCards from './OutOfCards';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
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

export default class Home extends Component {
  // state = {
  //   showModal: false,
  //   simpleModal: false,
  // }
  state = null
  swiper = null;
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      toggleMatchingPanel : false, // expand or collapse panel Matching Availability
      flipMatchingPanel : false,
      toggleTeamPanel : false,
      flipTeamPanel : false
    };
    
  }
  componentDidMount() {
    AsyncStorage.getItem('token', (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          console.log("null value recieved", result);
          this.setModalVisible(true);
        } else {
          console.log("result", result);
        }
      }
    });
    AsyncStorage.setItem('token', JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // onModal() {
  //   const { showModal } = this.state;
  //   this.setState({ showModal: !showModal });
  // }
  onModal2() {
    this.setModalVisible(false);
  }
  
  simpleModal() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.modalVisible}
        transparent
        onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', textAlign: 'center' }}>{'WELCOME TO\nGAMEON!'}</Text>
            <Image source={images.user9} style={{ width: 70, height: 70, marginTop: 10 }} />

            <Text style={styles.text4}>{"It's a simple:"}</Text>

            <Text style={styles.text5}>{'All players displayed match your location, ability and availability'}</Text>
            <Text style={styles.text5}>{'You can update your availability and preferences in settings at any time'}</Text>
            <Text style={styles.text5}>{'Swipe right to show interest in other players, teams and events'}</Text>
            <Text style={styles.text5}>{'Swipe left to discuss them'}</Text>
            <Text style={styles.text5}>{'A red dot shows mutual friends'}</Text>
            <Text style={styles.text5}>{"Tap on cards to read more'"}</Text>

            <TouchableOpacity style={[styles.btn, { marginTop: 20}]} onPress={() => this.onModal2()}>
              <Text style={{ color: 'white', fontFamily: 'ProximaNova-Regular', fontSize: 17}}>Ready!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  setTogglePanel(visible){
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({toggleMatchingPanel : visible});
  }
  setToggleTeamPanel = (visible) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({toggleTeamPanel : visible});
  }
  render() {
    const { navigate } = this.props.navigation;
    const style_invisible_newMatch = (this.state.toggleMatchingPanel === false && this.state.toggleTeamPanel === false) ? {opacity: 1} : {height : 0, opacity : 0, flex:0};
    const style_visible_newMatch = (this.state.toggleMatchingPanel === true) ? {opacity: 1} : {height : 0, opacity : 0, flex:0};
    const style_visible_team = (this.state.toggleTeamPanel === true) ? {opacity: 1} : {height : 0, opacity : 0, flex:0};
    const modal_style = (this.state.modalVisible === true && Platform.OS == 'android') ? {opacity:0.7} : {};
    
    return (
      <View style={[styles.container]}>
        <>
          <Header navigate= {navigate} />
           
          <CardStack 
            style={[styles.cardstack, style_invisible_newMatch, modal_style]} 
            ref={swiper => { this.swiper = swiper }}
            renderNoMoreCards = {() => {return <OutOfCards></OutOfCards>}}
            disableTopSwipe = {true}
            disableBottomSwipe = {true}
            verticalSwipe = {false}
          >
            <Card style={styles.card}>
              <FlipCard 
              ref={(card) => this.matchingcard = card}
              friction={15}
              flipHorizontal={true}
              flipVertical={false}
              clickable={true}
              onFlipEnd={(isFlipEnd)=>{this.setState({flipMatchingPanel : isFlipEnd});console.log(this.state.flipMatchingPanel)}}
              useNativeDriver = {false}
            >
              
              {/* Face Side */}
              <View style={styles.main}>
                <Image source={images.group} style={styles.groupImg} />
                
                <View style={{ flex: 1, padding: 15}}>
                  <Image source={images.woman} style={styles.img} />
                  <View style={{ flex: 1, marginHorizontal: 20 ,marginVertical: 15 }}>
                    <Text style={[styles.title]}>Alisha, 20</Text>
                    <Text style={[styles.text, { marginVertical: 6 }]}>Intermediate</Text>
                    <Text style={styles.text}>{'Studies at University of Bristol \n2 Miles Away'}</Text>
                  </View>
                  <View style={styles.bar}>
                    <View style={{ flexDirection: 'row',marginHorizontal: 10 ,marginVertical: 10}}>
                      <TouchableOpacity style={styles.circle}>
                        <Text style={styles.text_date}>MON</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.circle} onPress={() => this.setState({ showModal: true })}>
                        <Text style={styles.text_date}>WED</Text>
                      </TouchableOpacity>
                    </View>
                    <Image source={images.racket} style={styles.racket} />
                  </View>
                </View>
              </View>
              
              {/* Back Side */}
              <View style={styles.main}>
                <Image source={images.group} style={styles.groupImg} />

                {/* <View style={{flex:1}}> */}
                  <View style={{ flex: 1,flexDirection: 'column', padding: 10}}>
                    
                    <View style={{flex: 1, flexDirection : 'row'}}>
                      <Image source={images.woman} style={styles.back_img} />
                      <Text style={styles.text1}>Alisha, 20</Text>
                    </View>
                    <Text style={styles.text2}>{"Hi I'm Alisha! I love to meet new people through tennis!"}</Text>
                  </View>
                  
                  <View style={[{width:'100%',height:'100%',flex: 1.4 , paddingHorizontal: 15, paddingTop:10, backgroundColor: colors.darkBlue}]}>
                    <Text style={styles.text6}>{"Matching Availability"}</Text>
                    <DateView data={'Monday'} value={[0, 1, 0]}/>
                    <DateView data={'Wednesday'} value={[0, 1, 0]}/>
                    <TouchableOpacity style={{position:'absolute', bottom:0,   alignItems:'center', justifyContent : 'center', alignSelf:'center'}} onPress={() => this.setTogglePanel(true)}>
                      <AntDesign name="down" size={30} color={"white"} />
                    </TouchableOpacity>
                    
                  </View>
                  <View style={{flex: 1,  padding: 15}}>
                    <Text style={styles.text6}>{"Mutual Friends"}</Text>
                    <View style={{flex: 1, flexDirection : 'row', paddingHorizontal: 15}}>
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
                {/* </View> */}
              </View>
            </FlipCard>
            </Card>
            <Card style={styles.card}>
              <TeamCard setToggleTeamPanel={(visible) => this.setToggleTeamPanel(visible)}></TeamCard>
            </Card>
            <Card 
              style={styles.card}
              onSwipedRight = {() => navigate('TrainingAccept')}
            >
              <TrainingCard></TrainingCard>
            </Card>
            <Card style={styles.card} onSwipedRight = {() => navigate('EventAccept')}>
              <EventCard></EventCard>
            </Card>
            <Card style={styles.card}>
              <TrialCard></TrialCard>
            </Card>
          </CardStack>
          { this.state.toggleMatchingPanel && <View style={[styles.cardstack, style_visible_newMatch]}>
            <Card style={styles.card}>
              <View style={styles.main}>
                <Image source={images.group} style={styles.groupImg} />

                  <View style={[{width:'100%',height:'100%',padding: 20,flexDirection:'column',flex:1}]}>
                    <Text style={[styles.text6,{textAlign:"center"}]}>{"Matching Availability"}</Text>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                      <DateView data={'Monday'} value={[0, 1, 0]}/>
                      <DateView data={'Tuesday'} value={[0, 1, 0]}/>
                      <DateView data={'Wednesday'} value={[0, 1, 0]}/>
                      <DateView data={'Thursday'} value={[0, 1, 0]}/>
                      <DateView data={'Friday'} value={[0, 1, 0]}/>
                      <DateView data={'Saturday'} value={[0, 1, 0]}/>
                      <DateView data={'Sunday'} value={[0, 1, 0]}/>
                    </View>
                    
                    <TouchableOpacity style={{position:'absolute', bottom:0,   alignItems:'center', justifyContent : 'center', alignSelf:'center'}} onPress={() => this.setTogglePanel(false)}>
                      <AntDesign name="up" size={30} color={"white"} />
                    </TouchableOpacity>
                    
                  </View>
              </View>
            </Card>
          </View>}
          { this.state.toggleTeamPanel &&
            <View style={[styles.cardstack, style_visible_team]}>
            <Card style={styles.card}>
              <View style={[styles.main, {backgroundColor:colors.orange}]}>
                <Image source={images.group} style={styles.groupImg} />

                <View style={{flex: 1,  padding: 20}}>
                    <Text style={[styles.text6,{textAlign:"center"}]}>{"Mutual Friends"}</Text>
                    <View style={{paddingTop:10}}>
                      <View style={{flexDirection : 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection : 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection : 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11}/>
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      
                    </View>
                    <TouchableOpacity style={{position:'absolute', bottom:0,   alignItems:'center', justifyContent : 'center', alignSelf:'center'}} onPress={() => this.setToggleTeamPanel(false)}>
                          <AntDesign name="up" size={30} color={"white"} />
                        </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
  }
          {this.simpleModal()}
          <Footer onSwipedLeft={() => {if(this.swiper !== null) {this.setState({toggleMatchingPanel:false, toggleTeamPanel: false});this.swiper.swipeLeft();}}} onSwipedRight={() => {if(this.swiper !== null) {this.setState({toggleMatchingPanel:false, toggleTeamPanel: false});this.swiper.swipeRight();}}}/>
        </>
        {(this.state.showModal || this.state.modalVisible) && <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />}
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
    marginHorizontal: 30,
    justifyContent: 'center',
    borderRadius: 60,
  },
  cardstack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: 10
    // marginVertical : 10,
  },
  card:{
    width: width ,
    height: responsiveHeight(63),
  },
  mask: {
    width: '100%'
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
    flex:1.5,
    width: '100%',
    // height: 300,
    borderRadius:50
  },
  back_img: {
    width: width / 4.5,
    height: 60,
    top:10,
    left:10,
    borderRadius: 20
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40
  },
  m_avatar: {
    flex: 0.2,
    textAlign: 'center',
    padding: 10
  },
  text: {
    color: colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: 'ProximaNova-Bold'
  },
  text1: {
    color: colors.white,
    fontSize: 30,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    left:20,
    top:15
  },
  text2: {
    flex:1,
    color: colors.white,
    fontSize: 15,
    top: 20,
    marginHorizontal: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700'
  },
  text6 : {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700'
  },
  text7: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    alignItems: 'center',
    paddingHorizontal : 20
    // opacity: 0.2
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btn: {
    backgroundColor: '#2ecc71',
    height: 50,
    width: '90%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 8,
    backgroundColor: 'white'
  },
  text4: {
    color: 'white', 
    marginTop: 6, 
    fontSize: 30, 
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700'
  },
  text5: {
    color: 'white', 
    marginTop: 12, 
    fontSize: 18, 
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700'
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
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700'
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
