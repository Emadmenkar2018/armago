import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, Button,SafeAreaView, TouchableOpacity } from 'react-native';
import { LongHeader } from '../components/longHeader';
import { colors } from '../common/colors';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppStatusBar from '../components/AppStatusBar';
function DateView(props) {
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.circle_date, { backgroundColor: props.value[0] ? colors.green : colors.red}]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View style={[styles.circle_date, { backgroundColor: props.value[1] ? colors.green : colors.red}]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View style={[styles.circle_date, { backgroundColor: props.value[2] ? colors.green : colors.red}]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  )
}
class ChatScreen extends React.Component {
  state = {
    messages: [],
    
  }

  componentDidMount() {
    if(this.props.message){
      this.setState({
        messages : [
          {
            _id : 1,
            text : this.props.message,
            user: {
              name : this.props.user,
              avatar : this.props.avatar
            }
          }
        ]
      });
    }
    else{
      this.setState({
        messages: [
          {
              _id: 1,
              text: 'Hello',
              user: {
                _id: 1,
              },
          },
          {
            _id: 2,
            text: 'are you up for gym?',
            user: {
              _id: 2,
              name: 'React Native',
              avatar: this.props.avatar,
            },
          },
          {
            _id: 3,
            text: 'Hi!',
            user: {
              _id: 1,
            }
          },
          {
            _id: 4,
            text: 'Hi there Matt!',
            user: {
              _id: 2,
              name: 'React Native',
              avatar: this.props.avatar,
            },
          },
          {
            _id: 5,
            text: 'Hello Alisya!',
            user: {
              _id: 1,
            }
          }
        ],
      })
    }
    
    
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
              backgroundColor: colors.gray,
          },
          right: {
              backgroundColor: colors.lightgreen,
          }
        }}
        textStyle={{
          left : {
            color : 'white'
          },
          right: {
            color: 'white',
          }
        }}
       />
    );
  }

  
  render() {

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderBubble={this.renderBubble.bind(this)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}
export default class Chat extends Component {
    state = {
      togglePanel : false ,// false : collpased, true : expanded
      arrowIcon : 'down'
    }
    togglePanel(toggle){
      this.setState({togglePanel : toggle});
      this.setState({arrowIcon : toggle ? 'up' : 'down'})
    }
    render() {
        
        const {navigation} = this.props;
        const { navigate } = this.props.navigation;
        const user = navigation.getParam('user');
        const avatar = navigation.getParam('avatar');
        const message = navigation.getParam('message');
        const changeStyle = this.state.togglePanel === false ? {height: 200} : {height:450}
        return(
<>
        <AppStatusBar backgroundColor={colors.lightgreen} barStyle={Platform.OS === 'ios' ? 'dark-content':'light-content'}></AppStatusBar>
            <SafeAreaView style={styles.container}>
                <LongHeader title={user} avatar = {avatar} dark={true} left={colors.lightgreen} route={'Messages'} navigate= {navigate} bcolor = {colors.gray} rightIcon={'ellipsis1'}/>
                <View style={[{backgroundColor : colors.darkBlue , padding: 15, width: '80%', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', borderRadius : 20, marginVertical: 20},changeStyle]}>
                    <Text style={styles.text6}>{"Matching"}</Text>
                    <View style={{paddingVertical: 20}}>
                      <DateView data={'Monday'} value={[0, 1, 0]}/>
                      <DateView data={'Tuesday'} value={[0, 1, 0]}/>

                      {this.state.togglePanel && <View><DateView data={'Wednesday'} value={[0, 1, 0]}/>
                      <DateView data={'Thursday'} value={[0, 1, 0]}/>
                      <DateView data={'Friday'} value={[0, 1, 0]}/>
                      <DateView data={'Saturday'} value={[0, 1, 0]}/>
                      <DateView data={'Sunday'} value={[0, 1, 0]}/></View>}
        
                    </View>
                    
                    <TouchableOpacity style={{position:'absolute', bottom:0,   alignItems:'center', justifyContent : 'center', alignSelf:'center'}} onPress={() => this.state.togglePanel ? this.togglePanel(false) : this.togglePanel(true)}>
                      <AntDesign name={this.state.arrowIcon} size={30} color={"white"} />
                    </TouchableOpacity>
                </View>
                <ChatScreen avatar={avatar} message = {message}></ChatScreen>
            </SafeAreaView>
            </>
        )
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
    item: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    btn_date: {
      width: 100,
      height: 40,
      backgroundColor: '#34495E',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 40,
      marginLeft: 10
    },
    text3: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'ProximaNova-Regular',
      fontWeight: '700'
    },
    circle_date : {
      backgroundColor: colors.green,
      width: 35,
      height: 35,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 1
    },
    text_date : {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'ProximaNova-Regular'
    },
    text6 : {
      color: colors.white,
      fontSize: 20,
      fontFamily: 'ProximaNova-Bold',
      fontWeight: '700'
    }
});