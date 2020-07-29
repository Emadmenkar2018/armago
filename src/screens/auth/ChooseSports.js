/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Button, Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import APIKit from '../../services/api';

export default class ChooseSports extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      showSelected: false,
      selectedSports: [],
      sports: [],
    };
  }

  seleted_item(prop) {
    const found = this.state.selectedSports.filter(
      (item) => item.id === prop.id,
    );
    if (found.length > 0) {
      return (
        <Image source={images.sport_selected} style={styles.sport_selected} />
      );
    } else {
      return null;
    }
  }
  componentDidMount() {
    APIKit.getsports().then(
      (response) => {
        console.log('getting sports list');
        const sports = response.data;
        console.log(sports);
        sports.map((value, index) => {
          value.checked = false;
        });
        this.setState({sports: sports});
        //get user sports profile
        APIKit.getsportsprofile().then(
          (response) => {
            if (typeof response !== 'undefined') {
              this.setState({selectedSports: response.data});
            }
            console.log(response.data);
          },
          (error) => {
            console.log(error);
          },
        );
      },
      (error) => {
        console.log(error);
      },
    );
  }
  next(navigate) {
    console.log(this.state.selectedSports);
    if (this.state.selectedSports.length === 0) {
      Alert.alert('select at least one');
    } else {
      //patch sports profile
      const sports_payload = [];
      this.state.selectedSports.forEach((element) => {
        sports_payload.push(element.id);
      });
      const payload = {sports: sports_payload};
      APIKit.setsports(payload).then(
        (response) => {
          console.log(response);
          APIKit.getSetting().then((resp) => {
            let setting = resp.data;
            console.log(resp.data);
            setting.gender = sports_payload.map((sport) => ({
              sport,
              value: 'both',
            }));
            APIKit.setSetting(setting).then((resp) => {
              console.log(resp);
              navigate('ChooseAbility', {
                profile_sports: this.state.selectedSports,
              });
            });
          });
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>{'Choose which sports '}</Text>
            <Text style={styles.tlabel}>{'you’d like to play'}</Text>
            <Text style={styles.tlabel}>{'_'}</Text>
            <Text style={styles.sublabel}>
              {'We’ll be adding more sports soon'}
            </Text>
          </View>
          <View style={styles.sectionMiddle}>
            {/* <View style={styles.middleSection}> */}
            {this.state.sports.map((prop, key) => {
              if (prop.enable) {
                prop.id = prop._id;
                return (
                  <TouchableOpacity
                    key={prop._id}
                    onPress={() => {
                      // this.setState({
                      //   showSelected: !this.state.showSelected
                      // });
                      var arr = [...this.state.selectedSports];
                      const found = arr.filter((item) => item.id === prop.id);
                      if (found.length > 0) {
                        arr = arr.filter((item) => item.id !== prop.id);
                      } else {
                        arr.push(prop);
                      }
                      console.log(arr);
                      this.setState({selectedSports: arr});
                    }}>
                    <View style={styles.item}>
                      <View>
                        {this.seleted_item(prop)}
                        <Image
                          source={{uri: prop.imageUrl}}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'contain',
                            borderRadius: 50,
                          }}
                        />
                        <Text style={styles.sports_label}>{prop.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              } else {
                <View style={styles.item}>
                  <View>
                    <Image
                      source={{uri: prop.imageUrl}}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                        borderRadius: 50,
                      }}
                    />
                    <Text style={styles.sports_label}>{prop.name}</Text>
                  </View>
                  <Image
                    source={images.sport_comiong_soon}
                    style={{position: 'absolute', top: 0}}
                  />
                </View>;
              }
            })}

            {/* </View> */}
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('SetPersonalInfo')}
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
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  middleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coming_label: {
    position: 'absolute',
  },
  sports_label: {
    fontSize: RFValue(12, 580),
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
  },
  sport_selected: {
    position: 'absolute',
    top: -13,
    left: -13,
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
  circle: {
    backgroundColor: colors.green,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 1,
  },
});
