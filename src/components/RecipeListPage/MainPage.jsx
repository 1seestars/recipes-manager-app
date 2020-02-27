import React from "react";
import HeadButtons from "./HeadButtons";
import RecipeList from "./RecipeList";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <HeadButtons />
        <RecipeList />
      </div>
    );
  }
}
