/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';
import AppStatusBar from '../components/AppStatusBar';
import {images} from '../common/images';
import {Slider} from 'react-native-elements';

export default class AbilityEdit extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 3,
    };
    this.state1 = {
      value: 1,
      min: 0,
      max: 3,
    };
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.red}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <View style={styles.container}>
          <LongHeader
            title={'Ability'}
            color={colors.red}
            bcolor={colors.red}
            route={'EditProfile'}
            navigate={navigate}
          />
          <View style={styles.main}>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                {
                  'Set your perceived ability level:If you frequently play competitively then advanced is for you.'
                }
              </Text>
            </View>
            <View style={{flex: 5, width: '100%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.racket} style={styles.racket} />
                <Text style={styles.mlabel}>{'Tennis'}</Text>
              </View>
              <Slider
                step={1}
                minimumValue={this.state.min}
                maximumValue={this.state.max}
                value={this.state.value}
                thumbTintColor="#2ecc71"
                onValueChange={(val) => this.setState({value: val})}
              />
              <View style={styles.textCon}>
                <Text style={styles.label}>Beginner</Text>
                <Text style={styles.label}>Intermediate</Text>
                <Text style={styles.label}>Advanced</Text>
                <Text style={styles.label}>Team</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image source={images.cycling} style={styles.racket} />
                <Text style={styles.mlabel}>{'Cycling'}</Text>
              </View>
              <Slider
                step={1}
                minimumValue={this.state1.min}
                maximumValue={this.state1.max}
                value={this.state1.value}
                thumbTintColor="#2ecc71"
                onValueChange={(val) => this.setState1({value: val})}
              />
              <View style={styles.textCon}>
                <Text style={styles.label}>Beginner</Text>
                <Text style={styles.label}>Intermediate</Text>
                <Text style={styles.label}>Advanced</Text>
                <Text style={styles.label}>Team</Text>
              </View>
            </View>
            <View style={{width: '100%', borderRadius: 20}}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => this._handlePress(navigate)}>
                <Text style={{color: '#fff', fontSize: 18}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
  _handlePress(navigate) {
    navigate('EditProfile');
  }
  setState1(value) {
    this.state1 = value;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'absolute',
    // height: '100%'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
  },
  textCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignItems: 'center',
    fontSize: 15,
  },
  mlabel: {
    alignItems: 'center',
    fontSize: 18,
    left: 10,
  },
  text: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '700',
  },
  text2: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 15,
    fontWeight: '300',
    marginTop: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  text4: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  racket: {
    width: 40,
    height: 40,
  },
  circle: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 50,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
});
