/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  PixelRatio,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Input, Button, Icon} from 'react-native-elements';
import APIKit from '../../services/api';
import CountryPicker from 'react-native-country-picker-modal';

export default class SetPhone extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      phone: '+44',
      checked1: false,
      checked2: true,
      cca2: 'UK',
      country: null,
    };
  }
  next(navigate) {
    if (this.state.phone === '') {
      Alert.alert('Please input your phone number.');
    } else {
      const payload = {phone: this.state.phone};
      console.log(payload);
      APIKit.sendSMSCode(payload)
        .then(({data}) => {
          console.log(data);
          if (data.success) {
            navigate('SetSmsCode', {phone: this.state.phone});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>{'Get Started'}</Text>
          </View>
          <View style={styles.sectionMiddle}>
            <Input
              label="Phone"
              placeholder="Enter Your Phone Number"
              style={styles.input}
              value={this.state.phone}
              onChangeText={(value) => this.setState({phone: value})}
              keyboardType={'numeric'}
            />
            <CountryPicker
              onSelect={(value) =>
                this.setState({
                  country: value,
                  cca2: value.cca2,
                  phone: '+' + value.callingCode[0],
                })
              }
              cca2={this.state.cca2}
              translation="eng"
              withFlag={true}
            />
            {/* {this.state.country &&
              <Text style={styles.data}>
                {JSON.stringify(this.state.country, null, 2)}
              </Text>
            } */}
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('Signin')}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
    // backgroundColor:'red'
  },
  sectionTop: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
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
    flex: 1,
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    flex: 1,
    color: 'grey',
    fontSize: 20,
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
});
