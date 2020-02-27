import {
  SET_RECIPES,
  SET_MAIN_PAGE_LOADING,
  SET_DELETE_ALL_LOADING,
  SET_DELETE_LOADING,
  SET_MODAL_LOADING,
  SET_MAIN_PAGE_ERROR,
  SET_TOASTR_ERROR,
  SET_TOASTR_SUCCESS,
  SET_CURRENT_RECIPE,
  ADD_NEW_RECIPE,
  CHANGE_RECIPE,
  REMOVE_RECIPE
} from "./actions";

export const recipeListReducer = (
  state = {
    recipes: [],
    currentRecipe: {},
    isMainPageLoading: false,
    isDeleteButtonLoading: false,
    isDeleteAllButtonLoading: false,
    isModalSubmitButtonLoading: false,
    mainNetworkError: "",
    toastrError: "",
    toastrSuccess: ""
  },
  action
) => {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    case SET_CURRENT_RECIPE:
      return { ...state, currentRecipe: action.payload };
    case ADD_NEW_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case CHANGE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter(item => item._id !== action.payload._id),
          action.payload
        ]
      };
    case REMOVE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(item => item._id !== action.payload)
      };
    case SET_MAIN_PAGE_LOADING:
      return { ...state, isMainPageLoading: action.payload };
    case SET_DELETE_ALL_LOADING:
      return { ...state, isDeleteAllButtonLoading: action.payload };
    case SET_DELETE_LOADING:
      return { ...state, isDeleteButtonLoading: action.payload };
    case SET_MODAL_LOADING:
      return { ...state, isModalSubmitButtonLoading: action.payload };
    case SET_MAIN_PAGE_ERROR:
      return { ...state, mainNetworkError: action.payload };
    case SET_TOASTR_ERROR:
      return { ...state, toastrError: action.payload };
    case SET_TOASTR_SUCCESS:
      return { ...state, toastrSuccess: action.payload };
    default:
      return state;
  }
};
