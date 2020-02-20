import { CALL_MODAL_WINDOW } from './actions'

export const recipeListReducer = (state = { modalWindowType: '' }, action) => {
    switch (action.type) {
        case CALL_MODAL_WINDOW:
            return { ...state, modalWindowType: action.payload }
        default: return state
    }
}