import createReducer from '../../common/createReducer';
import dateFormat from 'dateformat';

const ADD = 'meal/ADD';
const ADD_NUTRIENT = 'meal/nutrient/ADD';
const REMOVE_NUTRIENT = 'meal/nutrient/REMOVE';
const ADD_REMARK = 'meal/remark/ADD';
const ADD_CALORIES = 'meal/calories/ADD';
const REMOVE_CALORIES = 'meal/calories/REMOVE';

export const addMeal = meal => ({
  type: ADD,
  meal,
});

export const addNutrient = nutrient => ({
  type: ADD_NUTRIENT,
  nutrient,
});

export const removeNutrient = id => ({
  type: REMOVE_NUTRIENT,
  id,
});

export const addRemark = remark => ({
  type: ADD_REMARK,
  remark,
});

export const addCalories = meal => ({
  type: ADD_CALORIES,
  meal,
});

export const removeCalories = meal => ({
  type: REMOVE_CALORIES,
  meal,
});

const INITIAL_STATE = {
  meal: {},
};

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => {
    state.meal = { ...action.meal };
    if (!state.meal.nutrient) {
      state.meal.nutrient = [];
    }
  },
  [ADD_NUTRIENT]: (state, action) => {
    state.meal.nutrient.push(action.nutrient);
  },
  [REMOVE_NUTRIENT]: (state, action) => {
    const index = state.meal.nutrient.findIndex(
      item => item.id === action.id || item.newId === action.id,
    );
    state.meal.nutrient.splice(index, 1);
  },
  [ADD_REMARK]: (state, action) => {
    state.meal.remark = action.remark;
  },
  [ADD_CALORIES]: (state, action) => {
    state.meal.totalCalories += parseFloat(action.meal.calorie);
    state.meal.totalCarbohydrate += parseFloat(action.meal.carbohydrate);
    state.meal.totalFat += parseFloat(action.meal.fat);
    state.meal.totalProtein += parseFloat(action.meal.protein);
  },
  [REMOVE_CALORIES]: (state, action) => {
    state.meal.totalCalories -= parseFloat(action.meal.calorie);
    state.meal.totalCarbohydrate -= parseFloat(action.meal.carbohydrate);
    state.meal.totalFat -= parseFloat(action.meal.fat);
    state.meal.totalProtein -= parseFloat(action.meal.protein);
  },
});

export default reducer;
