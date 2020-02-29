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
import Loader from "./Loader";
import styled from "styled-components";
import { MessageContainer, MessageSymbol } from "../styled/MesageContainer";

const StyledExpansionPanelSummary = styled(MuiExpansionPanelSummary)`
  :hover {
    background: #d8deff;
  }
  :focus {
    background: #3f51b5;
    color: white;
  }
`;

const StyledMuiExpansionPanelDetails = styled(MuiExpansionPanelDetails)`
  && {
    display: block;
    margin: 1% 0 0;
  }
`;

const ExpansionPanelDescription = styled.div`
  overflow: scroll;
`;

const ExpansionPanelHeader = styled.div`
  margin: 1% 0;
`;

const ExpansionPanelName = styled.div`
  margin: 0 0 2%;
  font-size: 24px;
`;

const ExpansionPanelDate = styled.div`
  font-style: Italic;
  opacity: 0.7;
`;

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
    return (
      <Loader>
        {recipes.length ? (
          <div>
            {recipes.map((recipe, index) => (
              <MuiExpansionPanel
                expanded={this.state.expand === recipe._id}
                onChange={this.handleChange(recipe._id)}
                key={index}
              >
                <StyledExpansionPanelSummary>
                  <ExpansionPanelHeader>
                    <ExpansionPanelName>{recipe.name}</ExpansionPanelName>
                    <ExpansionPanelDate>
                      {this.showCreationDate(recipe.createdAt)}
                    </ExpansionPanelDate>
                  </ExpansionPanelHeader>
                </StyledExpansionPanelSummary>
                <StyledMuiExpansionPanelDetails>
                  <ExpansionPanelDescription>
                    {recipe.versions[recipe.versions.length - 1].description}
                  </ExpansionPanelDescription>
                  <ManipulateItemButtons recipe={recipe} />
                </StyledMuiExpansionPanelDetails>
              </MuiExpansionPanel>
            ))}
            <ModalWindow onSubmit={values => this.handleSubmit(values)} />
          </div>
        ) : (
          <MessageContainer background={"#ffecb3"}>
            <MessageSymbol style={{ margin: "0 20px" }}>⚠</MessageSymbol>
            <span>There are no recipes</span>
            <ModalWindow onSubmit={values => this.handleSubmit(values)} />
          </MessageContainer>
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

// <Alert severity="error">This is an error alert — check it out!</Alert>
// <Alert severity="warning">This is a warning alert — check it out!</Alert>
