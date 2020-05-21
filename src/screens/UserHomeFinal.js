import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import { colors } from '../common/colors';
import { images } from '../common/images';
import { BlurView } from "@react-native-community/blur";

export default class UserHomeFinal extends Component {
  state = {
    showModal: false,
    simpleModal: false,
  }
  onModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }
  onModal2() {
    const { simpleModal } = this.state;
    this.setState({ simpleModal: !simpleModal });
  }
  renderModal() {
    return (
      <Modal
        visible={this.state.showModal}
        transparent
        onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={{ color: 'white', fontSize: 32, fontWeight: '700' }}>GAMEON!</Text>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>IT'S A MATCH!</Text>
            <Image source={images.user5} style={{ width: 120, height: 120, marginTop: 10 }} />
            <Text style={{ color: 'white', marginTop: 12, fontSize: 18, fontFamily: 'ProximaNova-Regular' }}>Alisha</Text>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <Image source={images.user9} style={{ width: 80, height: 80, marginTop: 16 }} />
            <TouchableOpacity style={styles.btn} onPress={() => this.onModal()} >
              <Text style={{ color: 'white', fontFamily: 'ProximaNova-Regular', fontSize: 17 }}>See Availability and Chat</Text>
            </TouchableOpacity>
            <View style={[styles.btn, { backgroundColor: 'orange' }]}>
              <Text style={{ color: 'white', fontFamily: 'ProximaNova-Regular', fontSize: 17 }}>Keep Browsing</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  simpleModal() {
    return (
      <Modal
        visible={this.state.simpleModal}
        transparent
        onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', textAlign: 'center' }}>{'WELCOME TO\nGAMEON!'}</Text>
            <Image source={images.user9} style={{ width: 70, height: 70, marginTop: 10 }} />

            <Text style={styles.text4}>{"It's a simple:"}</Text>

            <Text style={styles.text5}>{'All players displayed match your location, ability and availability'}</Text>
            <Text style={styles.text5}>{'You can update your availability and preferences in settings at any time'}</Text>
            <Text style={styles.text5}>{'Swipe right to show interest in other players, teams and events'}</Text>
            <Text style={styles.text5}>{'Swipe left to discuss them'}</Text>
            <Text style={styles.text5}>{'A red dot shows mutual friends'}</Text>
            <Text style={styles.text5}>{"Tap on cards to read more'"}</Text>

            <TouchableOpacity style={[styles.btn, { marginTop: 20}]} onPress={() => this.onModal2()}>
              <Text style={{ color: 'white', fontFamily: 'ProximaNova-Regular', fontSize: 17}}>Ready!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <>
          <Header />
          <View style={styles.main}>

              <Image source={images.group} style={styles.groupImg} />
              <Image source={images.woman} style={styles.img} />
              <View style={{ flex: 1, marginHorizontal: 20 ,marginVertical: 15 }}>
                <Text style={[styles.title]}>Alisha, 20</Text>
                <Text style={[styles.text, { marginVertical: 6 }]}>Intermediate</Text>
                <Text style={styles.text}>{'Studies at University of Bristol \n2 Miles Away'}</Text>
              </View>
              <View style={styles.bar}>
                <View style={{ flexDirection: 'row',marginHorizontal: 10 ,marginVertical: 10}}>
                  <TouchableOpacity style={styles.circle} onPress={() => this.setState({ simpleModal: true })}>
                    <Text style={styles.text}>MON</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.circle} onPress={() => this.setState({ showModal: true })}>
                    <Text style={styles.text}>WED</Text>
                  </TouchableOpacity>
                </View>
                <Image source={images.racket} style={styles.racket} />
              </View>
          </View>

          {this.renderModal()}
          {this.simpleModal()}

          <Footer />
        </>
        {(this.state.showModal || this.state.simpleModal) && <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
   },
  main: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    margin: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 60,
  },
  backgroundImage: {
    flex: 1,
    resizeMode : "cover",
    marginVertical: 17
  },
  mask: {
    width: '100%'
  },
  circle: {
    backgroundColor: colors.green,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  img: {
    flex:1,
    width: '90%',
    left:'5%',
    height: 180,
    top: 10,
    borderRadius: 20
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Proxima Nova Alt Bold'
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontFamily: 'Proxima Nova Alt Bold',
    marginTop: 10
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  racket: {
    width: 50,
    height: 50,
    marginHorizontal: 10 
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    alignItems: 'center',

    // opacity: 0.2
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btn: {
    backgroundColor: '#2ecc71',
    height: 50,
    width: '90%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 8,
    backgroundColor: 'white'
  },
  text4: {
    color: 'white', 
    marginTop: 6, 
    fontSize: 30, 
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center'
  },
  text5: {
    color: 'white', 
    marginTop: 12, 
    fontSize: 18, 
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center'
  }
});
