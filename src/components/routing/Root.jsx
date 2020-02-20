import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MainPage from '../RecipeListPage/MainPage'

const Root = ({ store }) => (
    <MuiThemeProvider>
            <Provider store={store}>
                <Router>
                    <MainPage />
                </Router>
            </Provider>
    </MuiThemeProvider>
)

export default Root