import React, { useState,Component  } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { Input,  Button ,Icon  } from 'react-native-elements';

const DatePicker = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
   
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
   
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
   
    const showDatepicker = () => {
      showMode('date');
    };
   
    const showTimepicker = () => {
      showMode('time');
    };
   
    return (
      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
};
export default class SetProfile extends Component {
    
    state = null;
    
    constructor(props){
        super(props);
        this.state = {
          fname: '',
          lname: '',
          checked1 : false,
          checked2: true
        }
    }
    
    
    render() {
        
        
        const { navigate } = this.props.navigation;
        
        
        return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.sectionTop}>
                    <Image source={images.logo} style={styles.logo}/>
                    <Text style={styles.tlabel}>{'Enter your personal info'}</Text>
                </View>
                <View style={styles.sectionMiddle}>
                        <Input
                        label = "First Name"
                        placeholder="Enter Your First Name"
                        style={styles.input}
                        onChangeText={value => this.setState({fname: value })}
                        />
                        <Input
                        label = "Last Name"
                        placeholder="Enter Your Last Name"
                        style={styles.input}
                        onChangeText={value => this.setState({ lname: value })}
                        />
                    <DatePicker></DatePicker>
                        
                </View>
                <View style={styles.sectionBottom}>
                    <View style={{ flex:1,alignItems:'flex-start'}}>
                    <Button
                    buttonStyle = {styles.navBtn_prev}
                    icon={
                        <Icon name={"chevron-left"}  size={60} color="#fff" />
                    }
                    onPress = {() => navigate('SetDetail')}
                    />
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end'}}>
                    <Button
                    buttonStyle = {styles.navBtn_next}
                    icon={
                        <Icon name={"chevron-right"}  size={60} color="#fff" />
                    }
                    onPress = {this.next()}
                    />
                    </View>
                </View>
            </View>
        </View>
        );
    }
    next() {
        console.log('next clicked')
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8
  },
  sectionTop: {
      flex : 1,
      alignItems: 'center',
      marginHorizontal: 50,
      marginVertical: 50
  },
  sectionMiddle: {
      flex : 2,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20
  },
  sectionBottom: {
      flex : 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingVertical: 20
  },
  logo : {
      flex: 1,
      width:250,
      height:50,
      resizeMode: 'contain'
  },
  tlabel : {
    flex: 1,
    color: 'grey',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'ProximaNova-Regular'
  },
  input : {
      width: '100%'
  },
  navBtn_prev: {
      width: 80,
      height: 80,
      backgroundColor: colors.red,
      borderRadius: 50
  },
  navBtn_next: {
    width: 80,
    height: 80,
    backgroundColor: colors.lightgreen,
    borderRadius: 50
}
});
