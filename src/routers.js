import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/main';

const navigationOptions = () => ({ header: null });

const HomeNavigator = createStackNavigator({
  Main: { screen: MainScreen, navigationOptions },
});

export const Routers = createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
  })
);
