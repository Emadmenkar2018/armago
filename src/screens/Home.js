/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import {colors} from '../common/colors';
import {images} from '../common/images';
import {BlurView} from '@react-native-community/blur';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import TrialCard from './TrialCard';
import TeamCard from './TeamCard';
import TrainingCard from './TrainingCard';
import EventCard from './EventCard';
import UserCard from './UserCard';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import OutOfCards from './OutOfCards';
import AntDesign from 'react-native-vector-icons/AntDesign';
import APIKit from '../services/api';

import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';

export const {width, height} = Dimensions.get('window');
function DateView(props) {
  console.log('props', props);
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor:
                props.value[0] === 'true' || props.value[0] === true
                  ? colors.green
                  : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor:
                props.value[1] === 'true' || props.value[1] === true
                  ? colors.green
                  : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor:
                props.value[2] === 'true' || props.value[2] === true
                  ? colors.green
                  : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  );
}

export default (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  // const allTeams = useSelector((state) => state.main.data.teams);
  const dispatch = useDispatch();
  var swiper = null;
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleMatchingPanel, setToggleMatchingPanel] = useState(false);
  const [toggleMatchingFollowPanel, setToggleMatchingFollowPanel] = useState(
    false,
  );
  const [toggleTeamPanel, setToggleTeamPanel] = useState(false);
  const [allcards, setCards] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          console.log('null value recieved', result);
          setModalVisible(true);
        } else {
          console.log('result', result);
        }
      }
    });
    AsyncStorage.setItem(
      'token',
      JSON.stringify({value: 'true'}),
      (err, result) => {
        console.log('error', err, 'result', result);
      },
    );
    APIKit.getCards().then((resp) => {
      setCards(resp.data);
    });
    APIKit.getuniversities().then((resp) => {
      setUniversities(resp.data);
    });
    APIKit.getSetting().then((resp) => {
      console.log('setting', resp.data);
      dispatch(Actions.setSetting(resp.data));
    });
    APIKit.getTeams().then((resp) => {
      dispatch(Actions.setTeams(resp.data.docs));
    });
    APIKit.getsports().then((resp) => {
      dispatch(Actions.setSports(resp.data));
    });
  }, []);

  const onModal2 = () => {
    setModalVisible(false);
  };

  const simpleModal = () => {
    return (
      <Modal
        animationType={'slide'}
        visible={modalVisible}
        transparent
        onRequestClose={() => onModal2()}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text
              style={{
                color: 'white',
                fontSize: 32,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {'WELCOME TO\nGAMEON!'}
            </Text>
            <Image
              source={images.user9}
              style={{width: 70, height: 70, marginTop: 10}}
            />

            <Text style={styles.text4}>{"It's a simple:"}</Text>

            <Text style={styles.text5}>
              {
                'All players displayed match your location, ability and availability'
              }
            </Text>
            <Text style={styles.text5}>
              {
                'You can update your availability and preferences in settings at any time'
              }
            </Text>
            <Text style={styles.text5}>
              {
                'Swipe right to show interest in other players, teams and events'
              }
            </Text>
            <Text style={styles.text5}>{'Swipe left to discuss them'}</Text>
            <Text style={styles.text5}>{'A red dot shows mutual friends'}</Text>
            <Text style={styles.text5}>{"Tap on cards to read more'"}</Text>

            <TouchableOpacity
              style={[styles.btn, {marginTop: 20}]}
              onPress={() => onModal2()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ProximaNova-Regular',
                  fontSize: 17,
                }}>
                Ready!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const setTogglePanel = (visible, user = {}) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleMatchingPanel(visible);
    setCurrentUser(user);
  };
  const render = () => {
    const {navigate} = props.navigation;
    const style_invisible_newMatch =
      toggleMatchingPanel === false &&
      toggleTeamPanel === false &&
      toggleMatchingFollowPanel === false
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const style_visible_newMatch =
      toggleMatchingPanel === true
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const style_visible_newMatch_follow =
      toggleMatchingFollowPanel === true
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const style_visible_team =
      toggleTeamPanel === true
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const modal_style =
      modalVisible === true && Platform.OS === 'android' ? {opacity: 0.7} : {};

    const users =
      allcards &&
      allcards.find((cd) => cd.users !== undefined) &&
      allcards.find((cd) => cd.users !== undefined).users;
    const teams =
      allcards &&
      allcards.find((cd) => cd.team !== undefined) &&
      allcards.find((cd) => cd.team !== undefined).team;
    const trials =
      allcards &&
      allcards.find((cd) => cd.trial !== undefined) &&
      allcards.find((cd) => cd.trial !== undefined).trial;
    const training =
      allcards &&
      allcards.find((cd) => cd.traning !== undefined) &&
      allcards.find((cd) => cd.traning !== undefined).traning;
    const events =
      allcards &&
      allcards.find((cd) => cd.event !== undefined) &&
      allcards.find((cd) => cd.event !== undefined).event;
    console.log('teams', teams);
    let cards = [];
    if (users) {
      cards = users.map((user, index) => (
        <Card
          style={styles.card}
          key={'user' + index}
          onSwipedLeft={() => {
            console.log('left');
            APIKit.cardGame({partner: user.id, enable: false}).then((resp) => {
              console.log(resp);
            });
          }}
          onSwipedRight={() => {
            console.log('right');
            APIKit.cardGame({partner: user.id, enable: true}).then((resp) => {
              console.log(resp);
            });
          }}>
          <UserCard
            user={user}
            universities={universities}
            setTogglePanel={setTogglePanel}
            setToggleFollowPanel={setToggleMatchingFollowPanel}
          />
        </Card>
      ));
      teams.map((team, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'team' + index}
            onSwipedLeft={() => {
              console.log(setting);
              APIKit.rejectTeam(
                {
                  player: setting.userId,
                },
                team.chief,
              ).then((resp) => {
                console.log(resp);
              });
            }}
            onSwipedRight={() => {
              console.log(setting);
              APIKit.joinTeam(
                {
                  player: setting.userId,
                },
                team.chief,
              ).then((resp) => {
                console.log(resp);
              });
            }}>
            <TeamCard
              team={team}
              setToggleTeamPanel={(visible) => setToggleTeamPanel(visible)}
            />
          </Card>,
        );
      });
      training.map((tr, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'training' + index}
            onSwipedRight={() => navigate('TrainingAccept')}>
            <TrainingCard training={tr} />
          </Card>,
        );
      });
      events.map((event, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'event' + index}
            onSwipedRight={() =>
              navigate('EventAccept', event.$__.scope.formUrl)
            }>
            <EventCard event={event} />
          </Card>,
        );
      });
      trials.map((trial, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'trial' + index}
            onSwipedLeft={() => {
              console.log('left');
              APIKit.cardJoin({
                cardId: trial.id,
                status: false,
                cardType: 'trial',
              }).then((resp) => {
                console.log(resp);
              });
            }}
            onSwipedRight={() => {
              // console.log('right');
              // APIKit.cardJoin({
              //   cardId: trial.id,
              //   status: true,
              //   cardType: 'trial',
              // }).then((resp) => {
              //   console.log(resp);
              // });
              navigate('TrialAccept', 'https://google.com');
            }}>
            <TrialCard trial={trial} />
          </Card>,
        );
      });
    }
    return (
      <View style={[styles.container]}>
        <>
          <Header navigate={navigate} />
          <CardStack
            style={[styles.cardstack, style_invisible_newMatch, modal_style]}
            ref={(swiperRef) => {
              swiper = swiperRef;
            }}
            renderNoMoreCards={() => {
              return <OutOfCards />;
            }}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            verticalSwipe={false}>
            {cards}
          </CardStack>
          {toggleMatchingPanel && (
            <View style={[styles.cardstack, style_visible_newMatch]}>
              <Card style={styles.card}>
                <View style={styles.main}>
                  {currentUser.mFriends.length > 0 && (
                    <Image source={images.group} style={styles.groupImg} />
                  )}

                  <View
                    style={[
                      {
                        width: '100%',
                        height: '100%',
                        padding: 20,
                        flexDirection: 'column',
                        flex: 1,
                      },
                    ]}>
                    <Text style={[styles.text6, {textAlign: 'center'}]}>
                      {'Matching Availability'}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <DateView
                        data={'Monday'}
                        value={currentUser.availability.mon}
                      />
                      <DateView
                        data={'Tuesday'}
                        value={currentUser.availability.tue}
                      />
                      <DateView
                        data={'Wednesday'}
                        value={currentUser.availability.wed}
                      />
                      <DateView
                        data={'Thursday'}
                        value={currentUser.availability.thu}
                      />
                      <DateView
                        data={'Friday'}
                        value={currentUser.availability.fri}
                      />
                      <DateView
                        data={'Saturday'}
                        value={currentUser.availability.sat}
                      />
                      <DateView
                        data={'Sunday'}
                        value={currentUser.availability.sun}
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => setTogglePanel(false)}>
                      <AntDesign name="up" size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          {toggleMatchingFollowPanel && (
            <View style={[styles.cardstack, style_visible_newMatch_follow]}>
              <Card style={styles.card}>
                <View
                  style={[styles.main, {backgroundColor: colors.lightBlue}]}>
                  <Image source={images.group} style={styles.groupImg} />

                  <View style={{flex: 1, padding: 20}}>
                    <Text style={[styles.text6, {textAlign: 'center'}]}>
                      {'Mutual Friends'}
                    </Text>
                    <View style={{paddingTop: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => setToggleMatchingFollowPanel(false)}>
                      <AntDesign name="up" size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          {toggleTeamPanel && (
            <View style={[styles.cardstack, style_visible_team]}>
              <Card style={styles.card}>
                <View style={[styles.main, {backgroundColor: colors.orange}]}>
                  <Image source={images.group} style={styles.groupImg} />

                  <View style={{flex: 1, padding: 20}}>
                    <Text style={[styles.text6, {textAlign: 'center'}]}>
                      {'Mutual Friends'}
                    </Text>
                    <View style={{paddingTop: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => setToggleTeamPanel(false)}>
                      <AntDesign name="up" size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          {simpleModal()}
          <Footer
            onSwipedLeft={() => {
              if (swiper !== null) {
                setToggleMatchingPanel(false);
                setToggleTeamPanel(false);
                swiper.swipeLeft();
              }
            }}
            onSwipedRight={() => {
              if (swiper !== null) {
                setToggleMatchingPanel(false);
                setToggleTeamPanel(false);
                swiper.swipeRight();
              }
            }}
          />
        </>
        {modalVisible && (
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="black"
          />
        )}
      </View>
    );
  };
  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  card: {
    width: width,
    height: responsiveHeight(63),
  },
  mask: {
    width: '100%',
  },
  circle: {
    backgroundColor: colors.green,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  img: {
    flex: 1.5,
    width: '100%',
    // height: 300,
    borderRadius: 50,
  },
  back_img: {
    width: width / 4.5,
    height: 60,
    top: 10,
    left: 10,
    borderRadius: 20,
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40,
  },
  m_avatar: {
    flex: 0.2,
    textAlign: 'center',
    padding: 10,
  },
  text: {
    color: colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: 'ProximaNova-Bold',
  },
  text1: {
    color: colors.white,
    fontSize: 30,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    left: 20,
    top: 15,
  },
  text2: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    top: 20,
    marginHorizontal: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  text6: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
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
    fontWeight: '700',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  racket: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
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
    paddingHorizontal: 20,
    // opacity: 0.2
  },
  absolute: {
    position: 'absolute',
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
    marginTop: 16,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 8,
    backgroundColor: 'white',
  },
  text4: {
    color: 'white',
    marginTop: 6,
    fontSize: 30,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700',
  },
  text5: {
    color: 'white',
    marginTop: 12,
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700',
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
    marginLeft: 10,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  circle_date: {
    backgroundColor: colors.green,
    width: 35,
    height: 35,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 1,
  },
  text_date: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
});
