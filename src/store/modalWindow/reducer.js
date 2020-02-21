import { SET_INITIAL_DATA } from './actions'

export const modalWindowReducer = (state = { initialValues: '' }, action) => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return { ...state, initialValues: action.payload }
        default: return state
    }
}