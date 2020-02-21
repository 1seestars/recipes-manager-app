export const SET_INITIAL_DATA = 'SET_INITIAL_DATA'
export const CALL_MODAL_WINDOW = 'CALL_MODAL_WINDOW'

export const setInitialData = data => ({ type: SET_INITIAL_DATA, payload: data })
export const callModalWindow = windowAction => ({ type: CALL_MODAL_WINDOW, payload: windowAction })