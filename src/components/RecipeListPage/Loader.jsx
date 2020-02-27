import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toastr } from "react-redux-toastr";

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
      <div style={{ width: "100%", padding: "150px 0", textAlign: "center" }}>
        <CircularProgress color="primary" />
      </div>
    );
  } else if (mainNetworkError) {
    return (
      <div className="badConnectAlert">
        <span style={{ fontWeight: "700", margin: "0 20px 0 40px" }}>✖</span>
        <span style={{ fontWeight: "700" }}>{mainNetworkError}</span>
      </div>
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
