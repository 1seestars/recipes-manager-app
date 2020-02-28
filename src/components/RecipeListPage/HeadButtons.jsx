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
import styled from "styled-components";

const HeadButton = styled(Button)`
  && {
    height: 40px;
    display: inline-block;
    border-radius: 5px;
    width: 120px;
    color: white;
    line-height: 16px;
    font-size: 16px;
    padding: 8px 0;
  }
}
`;

const HeadButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6% 0;
`;

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
    <HeadButtonsContainer>
      <HeadButton
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
      </HeadButton>
      <HeadButton variant="contained" color="primary" onClick={handleClick}>
        Add
      </HeadButton>
    </HeadButtonsContainer>
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
