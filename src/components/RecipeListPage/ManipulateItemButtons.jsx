import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { connect } from "react-redux";
import { deleteRecipe } from "../../store/recipeList/actions";
import {
  setInitialData,
  changeModalState
} from "../../store/modalWindow/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import red from "@material-ui/core/colors/red";

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
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          handleClick(
            recipe._id,
            recipe.name,
            recipe.versions[recipe.versions.length - 1].description
          )
        }
      >
        Edit
      </Button>
      {recipe.versions.length < 2 ? (
        <Button disabled variant="outlined" color="primary">
          ↺ Versions
        </Button>
      ) : (
        <Link to={`/recipe/${recipe._id}`}>
          <Button variant="outlined" color="primary">
            ↺ Versions
          </Button>
        </Link>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteRecipe(recipe._id)}
      >
        {isDeleteButtonLoading ? (
          <CircularProgress size={24} color={red[500]} />
        ) : (
          <DeleteIcon />
        )}
      </Button>
    </div>
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
