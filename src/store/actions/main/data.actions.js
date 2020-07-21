export const SET_SETTING = '[DATA] SET SETTING';
export const SAVE_SETTING = '[DATA] SAVE SETTING';
export const SET_TEAMS = '[DATA] SET TEAMS';
export const SET_SPORTS = '[DATA] SET SPORTS';
export const SET_PROFILE = '[DATA] SET PROFILE';

export const setSetting = (setting) => {
  return (dispatch) => {
    dispatch({type: SET_SETTING, payload: setting});
  };
};

export const saveSetting = () => {
  return (dispatch) => {
    dispatch({type: SAVE_SETTING});
  };
};

export const setTeams = (teams) => {
  return (dispatch) => {
    dispatch({type: SET_TEAMS, payload: teams});
  };
};

export const setSports = (sports) => {
  return (dispatch) => {
    dispatch({type: SET_SPORTS, payload: sports});
  };
};

export const setProfile = (profile) => {
  return (dispatch) => {
    dispatch({type: SET_PROFILE, payload: profile});
  };
};
