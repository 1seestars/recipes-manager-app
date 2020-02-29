import React from "react";
import { connect } from "react-redux";
import { deleteRecipe } from "../../store/recipeList/actions";
import {
  setInitialData,
  changeModalState
} from "../../store/modalWindow/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import red from "@material-ui/core/colors/red";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const ManipulateItemButtonsContainer = styled.div`
  width: 100%;
  margin: 5% 0 0 0;
  text-align: center;
`;

const ActionButton = styled(Fab)`
  && {
    display: inline-block;
    color: white;
    margin: 0 1%;
    width: 30px;
    height: 47px;
    line-height: 60px;
    padding: 0;
    background: ${props => props.background};
    :hover {
      background: ${props => props.hover};
    }
  }
`;

const ManipulateItemButtons = ({
  recipe,
  isDeleteButtonLoading,
  setInitialData,
  deleteRecipe,
  changeModalState
}) => {
  const handleClick = (id, name, description) => {
    setInitialData({ id, name, description });
    changeModalState(true);
  };

  return (
    <ManipulateItemButtonsContainer>
      <ActionButton
        title="Edit"
        variant="contained"
        color="secondary"
        onClick={() =>
          handleClick(
            recipe._id,
            recipe.name,
            recipe.versions[recipe.versions.length - 1].description
          )
        }
        background={"orange"}
        hover={"#e58d00"}
      >
        <EditIcon />
      </ActionButton>
      {recipe.versions.length < 2 ? (
        <ActionButton disabled variant="outlined">
          <ScheduleIcon />
        </ActionButton>
      ) : (
        <Link to={`/recipe/${recipe._id}`}>
          <ActionButton variant="outlined" color="primary" title="Versions">
            <ScheduleIcon />
          </ActionButton>
        </Link>
      )}
      <ActionButton
        title="Delete"
        variant="contained"
        color="secondary"
        onClick={() => deleteRecipe(recipe._id)}
      >
        {isDeleteButtonLoading ? (
          <CircularProgress size={24} color={red[500]} />
        ) : (
          <DeleteOutlineIcon />
        )}
      </ActionButton>
    </ManipulateItemButtonsContainer>
  );
};

const mapStateToProps = ({ recipeList: { isDeleteButtonLoading } }) => ({
  isDeleteButtonLoading
});

const mapDispatchToProps = {
  deleteRecipe,
  setInitialData,
  changeModalState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManipulateItemButtons);
