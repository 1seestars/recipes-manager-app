import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import Root from './components/routing/Root'
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Root store={store} />, document.getElementById('root'));