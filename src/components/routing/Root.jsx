import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import MainPage from "../RecipeListPage/MainPage";
import Versions from "../RecipeListPage/Versions";
import ReduxToastr from "react-redux-toastr";

const Root = ({ store }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/recipe/:id" component={Versions} />
        {/* <Route component={() => <div>404 Not Found</div>} /> */}
      </Router>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        getState={state => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Provider>
  </MuiThemeProvider>
);

export default Root;
