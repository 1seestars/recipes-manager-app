import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toastr } from "react-redux-toastr";
import styled from "styled-components";
import { MessageContainer, MessageSymbol } from "../styled/MesageContainer";

const LoaderContainer = styled.div`
  width: 100%;
  padding: 10% 0;
  text-align: center;
`;

const Loader = ({
  isMainPageLoading,
  mainNetworkError,
  children,
  toastrError,
  toastrSuccess
}) => {
  if (toastrError) toastr.error("Error", toastrError);
  if (toastrSuccess) toastr.success("Success", toastrSuccess);
  if (isMainPageLoading) {
    return (
      <LoaderContainer>
        <CircularProgress color="primary" />
      </LoaderContainer>
    );
  } else if (mainNetworkError) {
    return (
      <MessageContainer background={"#ffd8d3"}>
        <MessageSymbol>✖</MessageSymbol>
        <span>{mainNetworkError}</span>
      </MessageContainer>
    );
  } else {
    return children;
  }
};

const mapStateToProps = ({
  recipeList: {
    isMainPageLoading,
    mainNetworkError,
    toastrError,
    toastrSuccess
  }
}) => ({
  isMainPageLoading,
  mainNetworkError,
  toastrError,
  toastrSuccess
});

export default connect(mapStateToProps, null)(Loader);
