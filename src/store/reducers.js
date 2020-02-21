import { combineReducers } from "redux";
import { recipeListReducer } from "./recipeList/reducer";
import { modalWindowReducer } from "./modalWindow/reducer";
import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers({
    recipeList: recipeListReducer,
    modalWindow: modalWindowReducer,
    form: formReducer
})