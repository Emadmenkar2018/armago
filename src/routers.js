import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserHomeFinal from './screens/UserHomeFinal';
import Socials from './screens/Socials';
import Trial from './screens/Trial';
import OutOfCards from './screens/OutOfCards';
import TeamsView from './screens/TeamsView';
import TimeEdit from './screens/TimeEdit';
import Signin from './screens/Signin';
import LocationSwitch from './screens/LocationSwitch';
import Messages from './screens/Messages';

const navigationOptions = () => ({ header: null });

const HomeNavigator = createStackNavigator({
  UserHomeFinal: { screen: UserHomeFinal, navigationOptions },
  Signin: { screen: Signin, navigationOptions },
  TimeEdit: { screen: TimeEdit, navigationOptions },
  TeamsView: { screen: TeamsView, navigationOptions },
  OutOfCards: { screen: OutOfCards, navigationOptions },
  Trial: { screen: Trial, navigationOptions },
  Socials: { screen: Socials, navigationOptions },
  LocationSwitch: { screen: LocationSwitch, navigationOptions },
  Messages: { screen: Messages, navigationOptions },
}, {
  initialRouteName: 'Trial'
});

export const Routers = createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
  })
);