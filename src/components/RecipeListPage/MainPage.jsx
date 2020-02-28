import React from "react";
import HeadButtons from "./HeadButtons";
import RecipeList from "./RecipeList";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { PageContainer } from "../styled/PageContainer";

export default class MainPage extends React.Component {
  render() {
    return (
      <PageContainer>
        <HeadButtons />
        <RecipeList />
      </PageContainer>
    );
  }
}
