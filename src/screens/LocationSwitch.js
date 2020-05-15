import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LongHeader } from '../components/longHeader';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class LocationSwitch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LongHeader title={'Location'} color={'white'} left={'green'} dark />
        <View style={[styles.bar, { marginTop: -12 }]}>
          <Text style={[styles.text2, { fontSize: 18, paddingTop: 6 }]}>{'Set Location'}</Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.text2}>{'Current Location'}</Text>
          <AntDesign name="check" size={20} color={"blue"} />
        </View>
        <View style={[styles.category, {borderBottomWidth: 0}]}>
          <Text style={styles.text2}>{'Bristol'}</Text>
        </View>

        <View style={styles.bar2}>
          <Text style={[styles.text2, { fontSize: 18, paddingTop: 6, color: 'white' }]}>{'Add New Location'}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', paddingTop: 24, paddingHorizontal: 12}}>
          <Text style={styles.text}>{'Here you can change your location so that you can swipe in a specific area.\n\nPlease note that by changing your location,\n\nsome cards such as training and event cards speific to you may no longer be seen.\n\nUp to 5 can be saved.'}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
  },
  text: {
    color: 'grey',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular'
  },
  text2: {
    color: 'grey',
    fontSize: 21,
    fontFamily: 'ProximaNova-Regular'
  },
  item: {
    marginTop: 26,
  },
  bar: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    borderBottomColor: 'grey',
    backgroundColor: '#f8f8f8',
    height: 46,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  bar2: {
    backgroundColor: '#2ecc71',
    height: 48,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  category: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginLeft: 12,
    paddingRight: 12,
    paddingTop: 6
  }
});
