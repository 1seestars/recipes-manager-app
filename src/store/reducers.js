import { combineReducers } from "redux";
import { recipeListReducer } from "./recipeList/reducer";
import { modalWindowReducer } from "./modalWindow/reducer";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";

export const rootReducer = combineReducers({
  recipeList: recipeListReducer,
  modalWindow: modalWindowReducer,
  form: formReducer,
  toastr: toastrReducer
});
