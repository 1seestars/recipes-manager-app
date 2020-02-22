import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { connect } from "react-redux";
import { deleteRecipe } from "../../store/recipeList/actions";
import {
  toggleModalWindowType,
  setInitialData
} from "../../store/modalWindow/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const RecipeList = ({
  recipes,
  isLoading,
  networkError,
  deleteRecipe,
  toggleModalWindowType,
  changeId,
  setInitialData
}) => {
  const [expanded, setExpanded] = React.useState();
  const recipesReverse = recipes.reverse();

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showCreationDate = date => {
    const day = date.slice(0, 10);
    const time = date.slice(11, 19);
    return `Creation date: ${day} ${time} UTC`;
  };

  const handleEdit = (id, name, description) => {
    setInitialData({ name, description });
    toggleModalWindowType("change");
    changeId(id);
  };

  if (isLoading) {
    return (
      <div style={{ width: "100%", padding: "150px 0", textAlign: "center" }}>
        <CircularProgress color="primary" />
      </div>
    );
  } else if (!networkError) {
    if (recipes.length) {
      return (
        <div>
          {recipesReverse.reverse().map((recipe, index) => (
            <div className="recipeListWrapper">
              <ExpansionPanel
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <ExpansionPanelSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <div className="expansionPanelHeader">
                    <div
                      style={{
                        minWidth: "100%",
                        fontSize: "20px",
                        fontWeight: "700",
                        margin: "1% 0"
                      }}
                    >
                      {recipe.name}
                    </div>
                    <div
                      style={{
                        opacity: "0.8",
                        fontStyle: "Italic",
                        margin: "1% 0"
                      }}
                    >
                      {showCreationDate(recipe.createdAt)}
                    </div>
                  </div>
                </ExpansionPanelSummary>
                <MuiExpansionPanelDetails style={{ display: "block" }}>
                  <div className="recipePanelContent">
                    {recipe.versions[recipe.versions.length - 1].description}
                  </div>
                  <div className="manipulateButtonsContainer">
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ background: "orange", width: "100%" }}
                        onClick={() =>
                          handleEdit(
                            recipe._id,
                            recipe.name,
                            recipe.versions[recipe.versions.length - 1]
                              .description
                          )
                        }
                      >
                        Edit
                      </Button>
                    </div>
                    {recipe.versions.length < 2 ? (
                      <div>
                        <Button
                          disabled
                          variant="outlined"
                          color="primary"
                          style={{ width: "100%" }}
                        >
                          ↺ Versions
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/${recipe._id}`}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            style={{ width: "100%" }}
                          >
                            ↺ Versions
                          </Button>
                        </Link>
                      </div>
                    )}
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        style={{ width: "100%" }}
                        onClick={() => deleteRecipe(`recipe/${recipe._id}`)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </MuiExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="emptyRecipeListAlert">
          <span style={{ fontWeight: "700", margin: "0 20px 0 40px" }}>⚠</span>
          <span style={{ fontWeight: "700" }}>There are no recipes</span>
        </div>
      );
    }
  } else {
    return (
      <div className="badConnectAlert">
        <span style={{ fontWeight: "700", margin: "0 20px 0 40px" }}>✖</span>
        <span style={{ fontWeight: "700" }}>{networkError}</span>
      </div>
    );
  }
};

const mapStateToProps = ({
  recipeList: { recipes, isLoading, networkError }
}) => ({
  recipes,
  isLoading,
  networkError
});

const mapDispatchToProps = {
  deleteRecipe,
  toggleModalWindowType,
  setInitialData
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
