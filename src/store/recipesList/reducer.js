import { CALL_MODAL_WINDOW, SET_RECIPES, SET_LOADING, SET_ERROR } from './actions'

export const recipeListReducer = (state = { recipes: [], modalWindowType: '', isLoading: false, networkError: '' }, action) => {
    switch (action.type) {
        case CALL_MODAL_WINDOW:
            return { ...state, modalWindowType: action.payload }
        case SET_RECIPES:
            return { ...state, users: action.payload }
        case SET_LOADING:
            return { ...state, isLoading: action.payload }
        case SET_ERROR:
            return { ...state, networkError: action.payload }
        default: return state
    }
}