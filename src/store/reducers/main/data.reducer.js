import * as Actions from '../../actions/main/index';
import APIKit from '../../../services/api';

const initialState = {
  setting: {
    location: {
      lat: 33.821527,
      lng: -117.511249,
      address: '2415 Tuscany St, Corona, CA 92881',
    },
    distance: [0, 5],
    gender: [],
    age: [18, 30],
    seen: true,
    notifications: {
      matches: true,
      messages: false,
      training: true,
      socials: false,
      vibrations: true,
      sounds: true,
    },
  },
  teams: [],
  sports: [],
  profile: {},
  curLocation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_SETTING:
      console.log('SET_SETTING', action.payload);
      return {...state, setting: action.payload};
    case Actions.SAVE_SETTING:
      APIKit.setSetting(state.setting);
      return state;
    case Actions.SET_TEAMS:
      console.log('SET_TEAMS', action.payload);
      return {...state, teams: action.payload};
    case Actions.SET_SPORTS:
      console.log('SET_SPORTS', action.payload);
      return {...state, sports: action.payload};
    case Actions.SET_PROFILE:
      console.log('SET_PROFILE', action.payload);
      return {...state, profile: action.payload};
    case Actions.SET_CURLOCATION:
      console.log('SET_CURLOCATION', action.payload);
      return {...state, curLocation: action.payload};
    default:
      return state;
  }
};
