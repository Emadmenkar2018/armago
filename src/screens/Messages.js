/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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

import {useSelector} from 'react-redux';
export const {width, height} = Dimensions.get('window');
const KEYS_TO_FILTERS_NEWMATCHES = ['firstName'];
const KEYS_TO_FILTERS_MESSAGES = ['firstName', 'latest'];
export default (props) => {
  const contacts = useSelector((state) => state.main.chat.contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const searchUpdated = (term) => {
    setSearchTerm(term);
  };
  const render = () => {
    const {navigate} = props.navigation;
    const filtered_newMatches = contacts
      .filter((co) => co.count === 0)
      .filter(createFilter(searchTerm, KEYS_TO_FILTERS_NEWMATCHES));
    const filtered_Messages = contacts
      .filter((co) => co.count)
      .filter(createFilter(searchTerm, KEYS_TO_FILTERS_MESSAGES));
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
            <SearchInput
              onChangeText={(term) => {
                searchUpdated(term);
              }}
              style={styles.input}
              placeholder={'🔍 Search ' + contacts.length + ' matches'}
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
                  {contacts.filter((co) => co.count === 0).length}
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
                      navigate('Chat', {
                        user: prop,
                      })
                    }>
                    <View style={{paddingRight: 30}}>
                      <Image
                        source={{uri: prop.imageUrl}}
                        style={styles.user}
                      />
                      <View style={styles.dot} />
                      <Text style={[styles.name, {marginLeft: 10}]}>
                        {prop.firstName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{marginBottom: 30}}>
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
                  {contacts.filter((co) => co.count).length}
                </Text>
              </View>
            </View>
            <ScrollView>
              {filtered_Messages.map((prop) => {
                return (
                  <TouchableOpacity
                    key={prop.userId}
                    onPress={() =>
                      navigate('Chat', {
                        user: prop,
                      })
                    }>
                    <View style={styles.list}>
                      <Image
                        source={{uri: prop.imageUrl}}
                        style={styles.user}
                      />
                      {prop.unread && <View style={[styles.dot, {left: 59}]} />}
                      <View style={styles.listborder}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'ProximaNova-Bold',
                            color: '#666',
                          }}>
                          {prop.firstName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'ProximaNova-Regular',
                            color: '#999',
                          }}>
                          {prop.latest}
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
  };
  return render();
};

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
