/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Button, Icon, Slider} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import APIKit from '../../services/api';

export default class ChooseAbility extends Component {
  state = null;
  profile_sports = [];
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 3,
      abilitySports: [],
      profileSports: [],
      ablity: [], //edit ability
    };
  }

  componentDidMount() {
    // get sports ability
    console.log('choose ability');
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({profileSports: this.profile_sports});
    APIKit.getability().then(
      (response) => {
        console.log('getting sports ability list');
        const sports = response.data;
        this.setState({ablity: sports});
        console.log(this.state.ablity);
        this.setState({profileSports: this.profile_sports});
      },
      (error) => {
        console.log(error);
      },
    );
  }
  next(navigate) {
    // set sports ability
    const payload = {ability: this.state.ablity};
    APIKit.setability(payload).then(
      (response) => {
        console.log(response.data);
        navigate('SetBioUniversity');
      },
      (error) => {
        console.log(error);
      },
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    const selected_sports = this.props.navigation.state.params.profile_sports;
    this.profile_sports = selected_sports;
    // const found = this.state.ablity.filter(item => item.sportId == prop.id);
    // if(found.length == 0){
    //   this.state.ablity.push({sportId: prop.id, level: 'Beginner'});
    // }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>{'Choose Ability'}</Text>
            <Text style={styles.tlabel}>{'_'}</Text>
            <Text style={styles.sublabel}>
              {
                'We’ll match you with players of a similar skill level. Select your rough ability.'
              }
            </Text>
          </View>
          <View style={styles.sectionMiddle}>
            {this.state.profileSports.map((prop, key) => {
              const found = [...this.state.ablity].filter(
                (item) => item.sportId === prop.id,
              );
              const value = found.length > 0 ? found[0].level : 0;
              if (found.length === 0) {
                this.state.ablity.push({sportId: prop.id, level: 'Beginner'});
              }
              let _value = 0;
              switch (value) {
                case 'Beginner': {
                  _value = 0;
                  break;
                }
                case 'Intermediate': {
                  _value = 1;
                  break;
                }
                case 'Advanced': {
                  _value = 2;
                  break;
                }
                case 'Team': {
                  _value = 3;
                  break;
                }
              }

              return (
                <View key={prop.id} style={{marginVertical: 5}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{uri: prop.imageUrl}}
                      style={styles.racket}
                    />
                    <Text style={styles.mlabel}>{prop.name}</Text>
                  </View>
                  <Slider
                    step={1}
                    minimumValue={this.state.min}
                    maximumValue={this.state.max}
                    value={_value}
                    thumbTintColor="#2ecc71"
                    onValueChange={(val) => {
                      console.log(this.state.ablity);
                      let newArray = [...this.state.ablity];
                      const elementIdx = this.state.ablity.findIndex(
                        (element) => element.sportId === prop.id,
                      );

                      let _level = 'Beginner';
                      switch (val) {
                        case 0:
                          _level = 'Beginner';
                          break;
                        case 1:
                          _level = 'Intermediate';
                          break;
                        case 2:
                          _level = 'Advanced';
                          break;
                        case 3:
                          _level = 'Team';
                          break;
                        default:
                          break;
                      }
                      newArray[elementIdx] = {
                        ...newArray[elementIdx],
                        level: _level,
                      };
                      this.setState({ablity: newArray});
                      console.log(this.state.ablity);
                    }}
                  />
                  <View style={styles.textCon}>
                    <Text style={styles.label}>Beginner</Text>
                    <Text style={styles.label}>Intermediate</Text>
                    <Text style={styles.label}>Advanced</Text>
                    <Text style={styles.label}>Team</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('ChooseSports')}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.next(navigate)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 3,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  sectionBottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    flex: 3,
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    flex: 1,
    color: 'grey',
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  sublabel: {
    // flex: 1,
    color: 'grey',
    fontSize: RFValue(12, 580),
    fontWeight: '600',
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
  mlabel: {
    alignItems: 'center',
    fontSize: 18,
    left: 10,
  },
  racket: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignItems: 'center',
    fontSize: 15,
  },
});
