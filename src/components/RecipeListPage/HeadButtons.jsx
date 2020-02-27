import React from "react";
import Button from "@material-ui/core/Button";
import { deleteAllRecipes } from "../../store/recipeList/actions";
import {
  setInitialData,
  changeModalState
} from "../../store/modalWindow/actions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import red from "@material-ui/core/colors/red";

const HeadButtons = ({
  recipes,
  isDeleteAllButtonLoading,
  deleteAllRecipes,
  setInitialData,
  changeModalState
}) => {
  const handleClick = () => {
    setInitialData({});
    changeModalState(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        disabled={!recipes.length}
        onClick={deleteAllRecipes}
      >
        {isDeleteAllButtonLoading ? (
          <CircularProgress size={24} color={red[500]} />
        ) : (
          "Delete All"
        )}
      </Button>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ✚ Add
      </Button>
    </div>
  );
};

const mapStateToProps = ({
  recipeList: { recipes, isDeleteAllButtonLoading }
}) => ({
  recipes,
  isDeleteAllButtonLoading
});

const mapDispatchToProps = {
  deleteAllRecipes,
  setInitialData,
  changeModalState
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadButtons);
