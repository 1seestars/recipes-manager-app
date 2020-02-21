import { SET_RECIPES, SET_LOADING, SET_ERROR } from './actions'

export const recipeListReducer = (state = { recipes: [], isLoading: false, networkError: '' }, action) => {
    switch (action.type) {
        case SET_RECIPES:
            return { ...state, recipes: action.payload }
        case SET_LOADING:
            return { ...state, isLoading: action.payload }
        case SET_ERROR:
            return { ...state, networkError: action.payload }
        default: return state
    }
}