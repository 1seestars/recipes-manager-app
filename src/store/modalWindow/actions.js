export const SET_INITIAL_DATA = "SET_INITIAL_DATA";
export const TOGGLE_MODAL_WINDOW = "TOGGLE_MODAL_WINDOW";

export const setInitialData = data => ({
  type: SET_INITIAL_DATA,
  payload: data
});

export const changeModalState = value => ({
  type: TOGGLE_MODAL_WINDOW,
  payload: value
});
