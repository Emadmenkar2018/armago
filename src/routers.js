import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import Socials from './screens/Socials';
import TrialCard from './screens/TrialCard';
import TeamCard from './screens/TeamCard';
import OutOfCards from './screens/OutOfCards';
import TeamsView from './screens/TeamsView';
import TimeEdit from './screens/TimeEdit';
import AbilityEdit from './screens/AbilityEdit';
import Signin from './screens/auth/Signin';
import LocationSwitch from './screens/LocationSwitch';
import Messages from './screens/Messages';
import AuthLoadingScreen from './screens/auth/AuthLoading';
import SetPhone from './screens/auth/SetPhone';
import SetSmsCode from './screens/auth/SetSmsCode';
import SetDetail from './screens/auth/SetDetail';
import ChooseSports from './screens/auth/ChooseSports';
import ChooseAbility from './screens/auth/ChooseAbility';
import SetBioUniversity from './screens/auth/SetBioUniversity';
import SetAvailability from './screens/auth/SetAvailability';
import Permission from './screens/auth/Permission';

const navigationOptions = () => ({ header: null });

const HomeNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions },
  TimeEdit: { screen: TimeEdit, navigationOptions },
  TeamsView: { screen: TeamsView, navigationOptions },
  OutOfCards: { screen: OutOfCards, navigationOptions },
  TrialCard: { screen: TrialCard, navigationOptions },
  TeamCard: { screen: TeamCard, navigationOptions },
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
  SetPhone: { screen: SetPhone, navigationOptions },
  SetSmsCode: { screen: SetSmsCode, navigationOptions },
  SetDetail: { screen: SetDetail, navigationOptions },
  ChooseSports : { screen:ChooseSports, navigationOptions},
  ChooseAbility : { screen: ChooseAbility, navigationOptions},
  SetBioUniversity : { screen: SetBioUniversity, navigationOptions},
  SetAvailability : { screen : SetAvailability, navigationOptions},
  Permission: {screen : Permission, navigationOptions}
})



export const Routers = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Home: HomeNavigator,
    Auth : AuthStack
  }, 
  {
    initialRouteName: 'AuthLoading'
  })
);
