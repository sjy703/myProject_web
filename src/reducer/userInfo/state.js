import createReducer from '../../common/createReducer';

const ADD = 'userInfo/ADD';

export const addUser = user => ({ type: ADD, user });

const INITIAL_STATE = { user: {} };

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => {
    state.user = action.user;
  },
});

export default reducer;
