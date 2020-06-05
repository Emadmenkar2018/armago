import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { LongHeader } from '../components/longHeader';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { images } from '../common/images';
import { colors } from '../common/colors';

export default class EditGender extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      showSelected : true,
      gender : 'M'
    }
  }
  seleted_item (){
    if(this.state.showSelected){
        return (
        <Image source={images.genderSelected} style={styles.genderSelected}></Image>
        );
    }
    else{
        return null;
    }
}
selected(ge){
  this.setState({gender : ge})
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <LongHeader title={'Gender'} color={'white'} left={'green'}  route={'Settings'} navigate= {navigate} removeRightIcon dark />
        
        <View style={{  backgroundColor: '#f8f8f8', paddingTop: 24, paddingHorizontal: 12}}>
          <Text style={styles.text}>{'Setting a gender preference means that you will only be shown matches with the specified gender, however training and social events might still be mixed.'}</Text>
        </View>
        <View style={styles.gender}>
          <View style = {styles.lgender}>
            <Image source={images.racket} style={styles.racket} />
            <Text style={{color: 'black', fontSize: 17, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>Tennis</Text>
          </View>
          <View style = {styles.rgender}>
              <View style={styles.item}>
                  <View>
                    <TouchableOpacity onPress={() => this.selected('M')}>
                    <Image source={images.genderM} style={styles.racket} /> 
                    </TouchableOpacity>
                    
                    {this.state.gender == 'M' && this.seleted_item()}
                  </View>
              </View>
            <View style={styles.item}>
                <View>
                <TouchableOpacity onPress={() => this.selected('W')}>
                  <Image source={images.genderW} style={styles.racket} />
                  </TouchableOpacity>
                  {this.state.gender == 'W' && this.seleted_item()}
                </View>
            </View>
            <View style={styles.item}>
                <View>
                <TouchableOpacity onPress={() => this.selected('B')}>
                  <Image source={images.genderB} style={styles.racket} />
                  </TouchableOpacity>
                  {this.state.gender == 'B' && this.seleted_item()}
                </View>
            </View>
          </View>
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
    marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
  gender: {
    flexDirection : 'row',
    padding: 10
  },
  lgender : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'center'
  },
  rgender : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'center'
  },
  racket : {
    width: 50,
    height: 50,
    marginHorizontal: 5
  },
  genderSelected : {
    position : 'absolute',
    top:-10,
    left:0,
    zIndex : -1
  }
});
