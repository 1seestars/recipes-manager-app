import React from "react";
import { connect } from "react-redux";
import { getRecipe } from "../../store/recipeList/actions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Loader from "../RecipeListPage/Loader";
import styled from "styled-components";
import { PageContainer } from "../styled/PageContainer";

const Header = styled.div`
  width: 100%;
  height: 30%;
  padding: 2%;
  background: #3f51b5;
  color: white;
  border-radius: 10px;
  margin: 8% 0;
  box-sizing: border-box;
`;

const HeaderName = styled.div`
  && {
    margin: 0 0 0.7%;
    font-size: 25px;
  }
`;

const HeaderDate = styled.div`
  && {
    font-style: Italic;
    opacity: 0.7;
  }
`;

const Description = styled.div`
  && {
    width: 100%;
    padding: 2%;
    background: white;
    border-radius: 10px;
    margin: 2% 0;
    box-sizing: border-box;
    border: 1px solid lightgrey;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const LinkContainer = styled(Link)`
  && {
    text-decoration: none;
  }
`;

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

    return (
      <PageContainer>
        <Loader>
          {this.props.currentRecipe.name ? (
            <div>
              <Header>
                <HeaderName>{name}</HeaderName>
                <HeaderDate>{this.showCreationDate(createdAt)}</HeaderDate>
              </Header>
              {versions.reverse().map((version, index) => (
                <Description key={index}>{version.description}</Description>
              ))}
              <ButtonContainer>
                <LinkContainer to={`/`}>
                  <Button variant="contained" color="primary">
                    Back to main page
                  </Button>
                </LinkContainer>
              </ButtonContainer>
            </div>
          ) : (
            <div></div>
          )}
        </Loader>
      </PageContainer>
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
