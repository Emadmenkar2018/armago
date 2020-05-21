import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import Socials from './screens/Socials';
import Trial from './screens/Trial';
import OutOfCards from './screens/OutOfCards';
import TeamsView from './screens/TeamsView';
import TimeEdit from './screens/TimeEdit';
import AbilityEdit from './screens/AbilityEdit';
import Signin from './screens/auth/Signin';
import LocationSwitch from './screens/LocationSwitch';
import Messages from './screens/Messages';
import AuthLoadingScreen from './screens/auth/AuthLoading';
import SetDetail from './screens/auth/SetDetail';
import SetProfile from './screens/auth/SetProfile';
const navigationOptions = () => ({ header: null });

const HomeNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions },
  TimeEdit: { screen: TimeEdit, navigationOptions },
  TeamsView: { screen: TeamsView, navigationOptions },
  OutOfCards: { screen: OutOfCards, navigationOptions },
  Trial: { screen: Trial, navigationOptions },
  Socials: { screen: Socials, navigationOptions },
  LocationSwitch: { screen: LocationSwitch, navigationOptions },
  Messages: { screen: Messages, navigationOptions },
  AbilityEdit: { screen: AbilityEdit, navigationOptions }
},
  {
    initialRouteName: 'Home'
  });
const AuthStack = createStackNavigator({
  Signin : { screen: Signin, navigationOptions },
  SetDetail: { screen: SetDetail, navigationOptions },
  SetProfile : {screen: SetProfile, navigationOptions}
})



export const Routers = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Home: HomeNavigator,
    Auth : AuthStack
  }, 
  {
    initialRouteName: 'Home'
  })
);
