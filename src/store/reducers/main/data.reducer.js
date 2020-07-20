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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_SETTING:
      return {...state, setting: action.payload};
    case Actions.SAVE_SETTING:
      APIKit.setSetting(state.setting);
      return state;
    case Actions.SET_TEAMS:
      return {...state, teams: action.payload};
    case Actions.SET_SPORTS:
      return {...state, sports: action.payload};
    default:
      return state;
  }
};
