import { SET_INITIAL_DATA, CALL_MODAL_WINDOW } from './actions'

export const modalWindowReducer = (state = { initialValues: '', modalWindowType: '' }, action) => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return { ...state, initialValues: action.payload }
        case CALL_MODAL_WINDOW:
            return { ...state, modalWindowType: action.payload }
        default: return state
    }
}