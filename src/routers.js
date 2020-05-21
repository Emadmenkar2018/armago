import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import Socials from './screens/Socials';
import Trial from './screens/Trial';
import OutOfCards from './screens/OutOfCards';
import TeamsView from './screens/TeamsView';
import TimeEdit from './screens/TimeEdit';
import AbilityEdit from './screens/AbilityEdit';
import Signin from './screens/Signin';
import LocationSwitch from './screens/LocationSwitch';
import Messages from './screens/Messages';

const navigationOptions = () => ({ header: null });

const HomeNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions },
  Signin: { screen: Signin, navigationOptions },
  TimeEdit: { screen: TimeEdit, navigationOptions },
  TeamsView: { screen: TeamsView, navigationOptions },
  OutOfCards: { screen: OutOfCards, navigationOptions },
  Trial: { screen: Trial, navigationOptions },
  Socials: { screen: Socials, navigationOptions },
  LocationSwitch: { screen: LocationSwitch, navigationOptions },
  Messages: { screen: Messages, navigationOptions },
  AbilityEdit: { screen: AbilityEdit, navigationOptions },
}, {
  initialRouteName: 'AbilityEdit'
});

export const Routers = createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
  })
);
