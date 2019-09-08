import createReducer from '../../common/createReducer';

const ADD = 'summary/ADD';

export const addSummary = summary => ({ type: ADD, summary });

const INITIAL_STATE = { summary: {} };

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => {
    state.summary = action.summary;
  },
});

export default reducer;
