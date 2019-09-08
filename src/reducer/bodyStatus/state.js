import createReducer from '../../common/createReducer';

const ADD = 'bodyStatus/ADD';
const UPDATE = 'bodyStatus/UPDATE';

export const addBodyStatus = bodyStatus => ({ type: ADD, bodyStatus });
export const updateBodyStatus = bodyStatus => ({ type: UPDATE, bodyStatus });

const INITIAL_STATE = { bodyStatus: {} };

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => {
    state.bodyStatus = action.bodyStatus;
  },
  [UPDATE]: (state, action) => {
    state.bodyStatus = { ...state.bodyStatus, ...action.bodyStatus };
  },
});

export default reducer;
