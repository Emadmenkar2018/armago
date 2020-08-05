import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {images} from '../common/images';
export const {width, height} = Dimensions.get('window');
import {responsiveHeight} from 'react-native-responsive-dimensions';

import Close from '../../assets/close.svg';
import Checked from '../../assets/checked.svg';

export default class Footer extends Component {
  render() {
    return (
      <View>
        <Image source={images.oval} style={styles.oval} />
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.props.onSwipedLeft()}>
            {/* <Image source={images.close} style={styles.icon} /> */}
            <View style={styles.icon}>
              <Close height={styles.icon.height} width={styles.icon.width} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onSwipedRight()}>
            {/* <Image source={images.check} style={styles.icon} /> */}
            <View style={styles.icon}>
              <Checked height={styles.icon.height} width={styles.icon.width} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  oval: {
    width,
    height: width / 2,
    position: 'absolute',
    bottom: -width / 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 12,
    marginBottom: responsiveHeight(2),
    width: responsiveHeight(9),
    height: responsiveHeight(9),
  },
});
