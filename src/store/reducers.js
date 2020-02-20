import { combineReducers } from "redux";
import { recipeListReducer } from "./recipesList/reducer";
import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers({
    recipeList: recipeListReducer,
    form: formReducer
})