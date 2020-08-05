import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {images} from '../common/images';
import AppStatusBar from './AppStatusBar';
import {colors} from '../common/colors';
export const {width, height} = Dimensions.get('window');
import {
  responsiveScreenWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {useSelector} from 'react-redux';
import Chat from '../../assets/message.svg';
import Gear from '../../assets/gear.svg';

const THEME_COLOR = colors.lightgreen;

export default (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  const onSetting = () => {
    if (setting.distance) {
      props.navigate('Settings');
    }
  };
  return (
    <>
      <SafeAreaView />
      <SafeAreaView>
        <AppStatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
        <View style={styles.container}>
          <Image source={images.oval} style={styles.oval} />
          <View style={styles.header}>
            <TouchableOpacity onPress={onSetting}>
              <View style={styles.icon}>
                <Gear height={36} width={36} />
              </View>
            </TouchableOpacity>
            <Image source={images.GameOn2} style={styles.logo} />
            <TouchableOpacity onPress={() => props.navigate('Messages')}>
              <View style={styles.icon}>
                <Chat height={36} width={36} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  oval: {
    width,
    height: responsiveScreenWidth(45),
    marginTop: -80,
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1),
  },
  icon: {
    width: 36,
    height: 36,
    // marginTop: -10
    top: 15,
  },
  logo: {
    width: 180,
    height: 40,
    top: 20,
  },
});
