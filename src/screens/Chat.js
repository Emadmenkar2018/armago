/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppStatusBar from '../components/AppStatusBar';
import {useSelector, useDispatch} from 'react-redux';

import * as Actions from '../store/actions';

const fullWeekDays = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednsday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

function DateView(props) {
  console.log('DateView', props);
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.circle_date,
            {backgroundColor: props.value[0] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {backgroundColor: props.value[1] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {backgroundColor: props.value[2] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  );
}
const ChatScreen = (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  const history = useSelector((state) => state.main.chat.history);
  const socket = useSelector((state) => state.main.chat.socket);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.setHistory([]));
    socket.emit('History', {from: setting.userId, to: props.user.userId});
  }, []);

  useEffect(() => {
    console.log(history);
  }, [history]);

  const onSend = (newMessages = []) => {
    setMessages([...messages, newMessages]);
  };

  const renderBubble = (bubbles) => {
    return (
      <Bubble
        {...bubbles}
        wrapperStyle={{
          left: {
            backgroundColor: colors.gray,
          },
          right: {
            backgroundColor: colors.lightgreen,
          },
        }}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };

  const render = () => {
    return (
      <GiftedChat
        messages={messages}
        onSend={(msg) => onSend(msg)}
        renderBubble={renderBubble}
        user={{
          _id: setting.userId,
        }}
      />
    );
  };
  return render();
};

export default (props) => {
  const [togglePanel, setTogglePanel] = useState(false);
  const [arrowIcon, setArrowIcon] = useState('down');
  const onTogglePanel = (toggle) => {
    setTogglePanel(toggle);
    setArrowIcon(toggle ? 'up' : 'down');
  };
  const render = () => {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const user = navigation.getParam('user');
    const changeStyle = togglePanel === false ? {height: 200} : {height: 450};
    const today = new Date();
    let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    weekdays = weekdays.concat(weekdays.slice(0, today.getDay()));
    weekdays = weekdays.slice(today.getDay(), weekdays.length);
    let availableDays = weekdays.filter(
      (w) =>
        user.availability[w].includes(true) || user.availability[w].includes(1),
    );
    console.log('availableDays', availableDays);
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <LongHeader
            title={user.firstName}
            avatar={{uri: user.imageUrl}}
            dark={true}
            left={colors.lightgreen}
            route={'Messages'}
            navigate={navigate}
            bcolor={colors.gray}
            rightIcon={'ellipsis1'}
          />
          <View
            style={[
              {
                backgroundColor: colors.darkBlue,
                padding: 15,
                width: '80%',
                justifyContent: 'center',
                textAlign: 'center',
                alignSelf: 'center',
                borderRadius: 20,
                marginVertical: 20,
              },
              changeStyle,
            ]}>
            <Text style={styles.text6}>{'Matching'}</Text>
            <View style={{paddingVertical: 20}}>
              {availableDays.slice(0, 2 + (togglePanel && 5)).map((day) => (
                <DateView
                  key={day}
                  data={fullWeekDays[day]}
                  value={user.availability[day]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() =>
                togglePanel ? onTogglePanel(false) : onTogglePanel(true)
              }>
              <AntDesign name={arrowIcon} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <ChatScreen user={user} />
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
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
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
    marginLeft: 10,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  circle_date: {
    backgroundColor: colors.green,
    width: 35,
    height: 35,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 1,
  },
  text_date: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  text6: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
});
