import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Routers } from './src/routers';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Routers />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
