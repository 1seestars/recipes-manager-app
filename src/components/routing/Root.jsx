import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import MainPage from '../RecipeListPage/MainPage'
import Versions from '../VersionListPage/Versions'

const Root = ({ store }) => (
    <MuiThemeProvider>
            <Provider store={store}>
                <Router>
                    <Route exact path="/" component={MainPage} />
                    <Route path='/versions/:id' component={Versions} />
                </Router>
            </Provider>
    </MuiThemeProvider>
)

export default Root