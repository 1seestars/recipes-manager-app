import React from "react";
import { connect } from "react-redux";
import { getRecipe } from "../../store/recipeList/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Versions extends React.Component {
  componentDidMount() {
    const id = this.props.location.pathname;
    const route = `recipe${id}`;
    this.props.getRecipe(route);
  }

  showCreationDate = date => {
    const day = date.slice(0, 10);
    const time = date.slice(11, 19);
    return `Creation date: ${day} ${time} UTC`;
  };

  renderList = () => {
    const {
      networkError,
      name,
      createdAt,
      versions
    } = this.props.currentRecipe;
    if (!networkError) {
      if (versions) {
        return (
          <div className="versionsWrapper">
            <div className="versionsHeader">
              <span
                style={{ fontSize: "20px", fontWeight: "700", margin: "3px" }}
              >
                {name}
              </span>
              <span
                style={{ opacity: "0.8", fontStyle: "Italic", margin: "3px" }}
              >
                {this.showCreationDate(createdAt)}
              </span>
            </div>
            {versions
              ? versions
                  .reverse()
                  .map(version => (
                    <div className="recipeVersionWrapper">
                      {version.description}
                    </div>
                  ))
              : null}
            <div>
              <Link style={{ textDecoration: "none" }} to={`/`}>
                <Button variant="contained" color="primary">
                  Back to main page
                </Button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div
            style={{ width: "100%", padding: "150px 0", textAlign: "center" }}
          >
            <CircularProgress color="primary" />
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

  render() {
    return this.renderList();
  }
}

const mapStateToProps = ({ recipeList: { networkError, currentRecipe } }) => ({
  networkError,
  currentRecipe
});

const mapDispatchToProps = {
  getRecipe
};

export default connect(mapStateToProps, mapDispatchToProps)(Versions);
