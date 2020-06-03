import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
export const { width, height } = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign'

export function LongHeader(props) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: props.color}]}>
          <TouchableOpacity onPress={() => this.props.navigate(props.route)}>
            <AntDesign name="left" size={25} color={props.left ? props.left :"white"} />
          </TouchableOpacity>
            
            <Text style={[styles.text, props.dark && { color: 'black'}]}>{props.title}</Text>
            <Text style={styles.text}>{'         '}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 6
  },
  text: {
    color: 'white',
    fontFamily: "ProximaNova-Bold",
    fontSize: 20
  }
});
