import React from "react";
import { connect } from "react-redux";
import { getRecipe } from "../../store/recipeList/actions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Loader from "../RecipeListPage/Loader";

class Versions extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
  }

  showCreationDate = date => {
    const day = date.slice(0, 10);
    const time = date.slice(11, 19);
    return `Creation date: ${day} ${time}`;
  };

  render() {
    const { name, createdAt, versions } = this.props.currentRecipe;
    console.log(this.props.currentRecipe);

    return (
      <Loader>
        {this.props.currentRecipe.name ? (
          <div>
            <span>{name}</span>
            <span>{this.showCreationDate(createdAt)}</span>
            {versions.reverse().map((version, index) => (
              <div key={index}>{version.description}</div>
            ))}
            <div>
              <Link to={`/`}>
                <Button variant="contained" color="primary">
                  Back to main page
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Loader>
    );
  }
}

const mapStateToProps = ({ recipeList: { currentRecipe } }) => ({
  currentRecipe
});

const mapDispatchToProps = {
  getRecipe
};

export default connect(mapStateToProps, mapDispatchToProps)(Versions);
