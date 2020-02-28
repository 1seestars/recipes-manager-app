import { apiCall } from "../../utils/backendApi";
import { changeModalState } from "../modalWindow/actions";
export const SET_RECIPES = "SET_RECIPES";
export const SET_CURRENT_RECIPE = "SET_CURRENT_RECIPE";
export const SET_MAIN_PAGE_LOADING = "SET_MAIN_PAGE_LOADING";
export const SET_DELETE_ALL_LOADING = "SET_DELETE_ALL_LOADING";
export const SET_DELETE_LOADING = "SET_DELETE_LOADING";
export const SET_MODAL_LOADING = "SET_MODAL_LOADING";
export const SET_MAIN_PAGE_ERROR = "SET_MAIN_PAGE_ERROR";
export const SET_TOASTR_ERROR = "SET_TOASTR_ERROR";
export const ADD_NEW_RECIPE = "ADD_NEW_RECIPE";
export const CHANGE_RECIPE = "CHANGE_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const SET_TOASTR_SUCCESS = "SET_TOASTR_SUCCESS";

export const setRecipes = data => ({
  type: SET_RECIPES,
  payload: data
});
export const setRecipe = data => ({
  type: SET_CURRENT_RECIPE,
  payload: data
});
export const addNewRecipe = recipe => ({
  type: ADD_NEW_RECIPE,
  payload: recipe
});
export const changeRecipe = recipe => ({
  type: CHANGE_RECIPE,
  payload: recipe
});
export const removeRecipe = id => ({
  type: REMOVE_RECIPE,
  payload: id
});
export const setMainLoading = value => ({
  type: SET_MAIN_PAGE_LOADING,
  payload: value
});
export const setDeleteAllLoading = value => ({
  type: SET_DELETE_ALL_LOADING,
  payload: value
});
export const setDeleteLoading = value => ({
  type: SET_DELETE_LOADING,
  payload: value
});
export const setModalLoading = value => ({
  type: SET_MODAL_LOADING,
  payload: value
});
export const setMainPageError = message => ({
  type: SET_MAIN_PAGE_ERROR,
  payload: message
});
export const setToastrError = message => ({
  type: SET_TOASTR_ERROR,
  payload: message
});
export const setToastrSuccess = message => ({
  type: SET_TOASTR_SUCCESS,
  payload: message
});

export const getRecipes = () => async dispatch => {
  try {
    dispatch(setMainLoading(true));
    const data = await apiCall("recipes", "GET");
    dispatch(setRecipes(data.reverse()));
  } catch (e) {
    dispatch(setMainPageError(e.message));
  } finally {
    dispatch(setMainLoading(false));
  }
};

export const getRecipe = id => async dispatch => {
  try {
    dispatch(setMainLoading(true));
    const route = `recipe/${id}`;
    const data = await apiCall(route, "GET");
    dispatch(setRecipe(data));
  } catch (e) {
    dispatch(setMainPageError(e.message));
  } finally {
    dispatch(setMainLoading(false));
  }
};

export const addRecipe = body => async dispatch => {
  try {
    dispatch(setModalLoading(true));
    const newRecipe = await apiCall("recipe", "POST", body);
    dispatch(addNewRecipe(newRecipe));
    dispatch(changeModalState(false));
  } catch (e) {
    dispatch(setToastrError(e.message));
  } finally {
    dispatch(setModalLoading(false));
    dispatch(setToastrError(""));
  }
};

export const editRecipe = (id, body) => async dispatch => {
  try {
    dispatch(setModalLoading(true));
    const route = `recipe/${id}`;
    const changedRecipe = await apiCall(route, "PUT", body);
    dispatch(changeRecipe(changedRecipe));
    dispatch(changeModalState(false));
  } catch (e) {
    dispatch(setToastrError(e.message));
  } finally {
    dispatch(setModalLoading(false));
    dispatch(setToastrError(""));
  }
};

export const deleteRecipe = id => async dispatch => {
  try {
    dispatch(setDeleteLoading(true));
    const route = `recipe/${id}`;
    const res = await apiCall(route, "DELETE");
    dispatch(removeRecipe(id));
    dispatch(setToastrSuccess(res.message));
  } catch (e) {
    dispatch(setToastrError(e.message));
  } finally {
    dispatch(setDeleteLoading(false));
    dispatch(setToastrSuccess(""));
    dispatch(setToastrError(""));
  }
};

export const deleteAllRecipes = () => async dispatch => {
  try {
    dispatch(setDeleteAllLoading(true));
    const res = await apiCall("recipes", "DELETE");
    dispatch(setRecipes([]));
    dispatch(setToastrSuccess(res.message));
  } catch (e) {
    dispatch(setToastrError(e.message));
  } finally {
    dispatch(setDeleteAllLoading(false));
    dispatch(setToastrSuccess(""));
    dispatch(setToastrError(""));
  }
};
