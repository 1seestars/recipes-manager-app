export const SET_INITIAL_DATA = "SET_INITIAL_DATA";
export const TOGGLE_MODAL_WINDOW_TYPE = "TOGGLE_MODAL_WINDOW_TYPE";

export const setInitialData = data => ({
  type: SET_INITIAL_DATA,
  payload: data
});
export const toggleModalWindowType = windowAction => ({
  type: TOGGLE_MODAL_WINDOW_TYPE,
  payload: windowAction
});
