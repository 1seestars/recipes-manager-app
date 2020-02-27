import React from "react";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { connect } from "react-redux";
import ManipulateItemButtons from "./ManipulateItemButtons";
import ModalWindow from "./ModalWindow";
import {
  addRecipe,
  editRecipe,
  getRecipes
} from "../../store/recipeList/actions";
import Loader from "../RecipeListPage/Loader";

class RecipeList extends React.Component {
  state = {
    expand: false
  };

  componentDidMount() {
    this.props.getRecipes();
  }

  handleChange = panel => (event, newExpanded) => {
    this.setState({ expand: newExpanded ? panel : false });
  };

  showCreationDate = date => {
    const day = date.slice(0, 10);
    const time = date.slice(11, 19);
    return `Creation date: ${day} ${time}`;
  };

  handleSubmit = values => {
    const { addRecipe, editRecipe } = this.props;
    if (this.props.initialValues.id) {
      editRecipe(this.props.initialValues.id, values);
    } else {
      addRecipe(values);
    }
  };

  render() {
    const { recipes } = this.props;
    const recipesReverse = recipes.reverse();

    return (
      <Loader>
        {recipes.length ? (
          <div>
            {recipesReverse.reverse().map((recipe, index) => (
              <MuiExpansionPanel
                expanded={this.state.expand === recipe._id}
                onChange={this.handleChange(recipe._id)}
                key={index}
              >
                <MuiExpansionPanelSummary>
                  {recipe.name}
                  {this.showCreationDate(recipe.createdAt)}
                </MuiExpansionPanelSummary>
                <MuiExpansionPanelDetails>
                  {recipe.versions[recipe.versions.length - 1].description}
                  <ManipulateItemButtons recipe={recipe} />
                </MuiExpansionPanelDetails>
              </MuiExpansionPanel>
            ))}
            <ModalWindow onSubmit={values => this.handleSubmit(values)} />
          </div>
        ) : (
          <div className="emptyRecipeListAlert">
            <span style={{ fontWeight: "700", margin: "0 20px 0 40px" }}>
              ⚠
            </span>
            <span style={{ fontWeight: "700" }}>There are no recipes</span>
            <ModalWindow onSubmit={values => this.handleSubmit(values)} />
          </div>
        )}
      </Loader>
    );
  }
}

const mapStateToProps = ({
  recipeList: { recipes },
  modalWindow: { initialValues }
}) => ({
  recipes,
  initialValues
});

const mapDispatchToProps = {
  addRecipe,
  editRecipe,
  getRecipes
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
