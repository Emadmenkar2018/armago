/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {images} from '../common/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../common/colors';
import AppStatusBar from '../components/AppStatusBar';
import SearchInput, {createFilter} from 'react-native-search-filter';
export const {width, height} = Dimensions.get('window');
const KEYS_TO_FILTERS_NEWMATCHES = ['name'];
const KEYS_TO_FILTERS_MESSAGES = ['name', 'message'];
export default class Messages extends Component {
  newMatches = [
    {
      id: 1,
      name: 'Jeffery',
      avatar: images.user1,
    },
    {
      id: 2,
      name: 'Alan',
      avatar: images.user2,
    },
    {
      id: 3,
      name: 'Leo',
      avatar: images.user3,
    },
    {
      id: 4,
      name: 'Chris',
      avatar: images.user4,
    },
  ];
  Messages = [
    {
      id: 10,
      name: 'Mathew',
      avatar: images.user6,
      message: 'Still up for tonight?',
    },
    {
      id: 11,
      name: 'Mathaw',
      avatar: images.user7,
      message: 'Hello, Are you there?',
    },
    {
      id: 12,
      name: 'Matsew',
      avatar: images.user8,
      message: 'Hi Good morning!',
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  searchbyText() {
    this.setState({
      newMatches: this.state.newMatches.filter((match) =>
        match.name.includes(''),
      ),
      Messages: this.state.Messages.filter((message) =>
        message.message.includes(''),
      ),
    });
  }
  render() {
    const {navigate} = this.props.navigation;
    const filtered_newMatches = this.newMatches.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS_NEWMATCHES),
    );
    const filtered_Messages = this.Messages.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS_MESSAGES),
    );
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <Image source={images.oval3} style={styles.oval1} />
          <View style={styles.main}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <AntDesign name="home" size={26} color={'white'} />
              </TouchableOpacity>
              <Image source={images.msg} style={styles.msg} />
              <AntDesign
                name="home"
                size={26}
                color={'white'}
                style={{opacity: 0}}
              />
            </View>
            {/* <TextInput
            style={styles.input}
            placeholder={'🔍 Search 8 matches'}
            onChangeText = {text => this.searchbyText(text)}
          /> */}
            <SearchInput
              onChangeText={(term) => {
                this.searchUpdated(term);
              }}
              style={styles.input}
              placeholder={'🔍 Search 8 matches'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ProximaNova-Bold',
                  fontSize: 16,
                }}>
                New Matches
              </Text>
              <View style={styles.circle}>
                <Text
                  style={{
                    color: colors.lightgreen,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {this.newMatches.length}
                </Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', marginTop: 12, height: 90}}
              horizontal>
              {filtered_newMatches.map((prop) => {
                return (
                  <TouchableOpacity
                    key={prop.id}
                    onPress={() =>
                      navigate('Chat', {user: prop.name, avatar: prop.avatar})
                    }>
                    <View style={{paddingRight: 30}}>
                      <Image source={prop.avatar} style={styles.user} />
                      <View style={styles.dot} />
                      <Text style={[styles.name, {marginLeft: 10}]}>
                        {prop.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text
                style={{
                  color: colors.lightgreen,
                  fontFamily: 'ProximaNova-Bold',
                  fontSize: 16,
                }}>
                Messages
              </Text>
              <View
                style={[styles.circle, {backgroundColor: colors.lightgreen}]}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {this.Messages.length}
                </Text>
              </View>
            </View>
            <ScrollView>
              {filtered_Messages.map((prop) => {
                return (
                  <TouchableOpacity
                    key={prop.id}
                    onPress={() =>
                      navigate('Chat', {
                        user: prop.name,
                        avatar: prop.avatar,
                        message: prop.message,
                      })
                    }>
                    <View style={styles.list} key={prop.id}>
                      <Image source={prop.avatar} style={styles.user} />
                      <View style={[styles.dot, {left: 59}]} />
                      <View style={styles.listborder}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'ProximaNova-Bold',
                            color: '#666',
                          }}>
                          {prop.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'ProximaNova-Regular',
                            color: '#999',
                          }}>
                          {prop.message}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <Image source={images.oval} style={styles.oval2} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: 12,
  },
  text: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
  },
  text1: {
    color: 'grey',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  oval1: {
    width: width,
    height: 350,
    position: 'absolute',
    top: -150,
  },
  oval2: {
    width,
    height: 150,
    position: 'absolute',
    bottom: -100,
  },
  msg: {
    width: 40,
    height: 32,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    height: 32,
    padding: 0,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 6,
  },
  circle: {
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  user: {
    width: 70,
    height: 70,
  },
  dot: {
    backgroundColor: colors.lightgreen,
    borderWidth: 3,
    borderColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 26,
  },
  name: {
    marginLeft: 20,
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'ProximaNova-Regular',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    zIndex: 100,
  },
  listborder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    marginLeft: 12,
    width: '100%',
  },
});
