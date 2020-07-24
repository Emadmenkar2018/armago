import * as Actions from '../../actions/main/index';

import io from 'socket.io-client';

const initialState = {
  contacts: [],
  socket: io('http://ec2-35-178-32-220.eu-west-2.compute.amazonaws.com'),
  history: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_CONTACTS:
      console.log('SET_CONTACTS', action.payload);
      return {...state, contacts: action.payload};
    case Actions.SET_HISTORY:
      console.log('SET_HISTORY', action.payload);
      return {...state, history: action.payload};
    default:
      return state;
  }
};
