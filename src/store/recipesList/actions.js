import { apiCall } from '../../utils/backendApi'
export const CALL_MODAL_WINDOW = 'CALL_MODAL_WINDOW'
export const SET_RECIPES = 'SET_RECIPES'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

export const callModalWindow = windowAction => ({ type: CALL_MODAL_WINDOW, payload: windowAction })
export const setRecipes = data => ({ type: SET_RECIPES, payload: data })
export const setLoading = value => ({ type: SET_LOADING, payload: value })
export const setError = message => ({ type: SET_ERROR, payload: message })

export const getRecipes = () => async dispatch => {
    try {
        dispatch(setLoading(true))
        const data = await apiCall('recipes', 'GET')
        dispatch(setRecipes(data))
    } catch (e) {
        dispatch(setError(e.message))
    } finally {
        dispatch(setLoading(false))
    }
}

export const addRecipe = body => async dispatch => {
    try {
        dispatch(setLoading(true))
        await apiCall('recipe', 'POST', body)
        dispatch(setRecipes(await apiCall('recipes', 'GET')))
    } catch (e) {
        dispatch(setError('Error: something went wrong :-('))
    } finally {
        dispatch(setLoading(false))
    }
}

export const editRecipe = (route, body) => async dispatch => {
    try {
        dispatch(setLoading(true))
        await apiCall(route, 'PUT', body)
        dispatch(setRecipes(await apiCall('recipes', 'GET')))
    } catch (e) {
        dispatch(setError('Error: something went wrong :-('))
    } finally {
        dispatch(setLoading(false))
    }
}

export const deleteRecipe = route => async dispatch => {
    try {
        await apiCall(route, 'DELETE')
        dispatch(setRecipes(await apiCall('recipes', 'GET')))
    } catch (e) {
        dispatch(setError(e.message))
    } 
}

export const deleteAllRecipes = () => async dispatch => {
    try {
        await apiCall('recipes', 'DELETE')
        dispatch(setRecipes(await apiCall('recipes', 'GET')))
    } catch (e) {
        dispatch(setError(e.message))
    } 
}