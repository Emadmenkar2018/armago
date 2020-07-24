export const SET_CONTACTS = '[CHAT] SET CONTACTS';
export const SET_HISTORY = '[CHAT] SET HISTORY';

export const setContacts = (contacts) => {
  return (dispatch) => {
    dispatch({type: SET_CONTACTS, payload: contacts});
  };
};

export const setHistory = (history) => {
  return (dispatch) => {
    dispatch({type: SET_HISTORY, payload: history});
  };
};
