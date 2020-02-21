import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/recipeList/actions'
import { callModalWindow, setInitialData } from '../../store/modalWindow/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const RecipeList = ({ recipes, isLoading, networkError, deleteRecipe, callModalWindow, changeId, setInitialData }) => {
  const [expanded, setExpanded] = React.useState();

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSubmit = (id, name, description) => {
    setInitialData({ name, description })
    callModalWindow('change')
    changeId(id)
  }

  if (isLoading) {
      return (
          <div style={{ width: '100%', padding: '150px 0', textAlign: 'center' }}>
              <CircularProgress color="primary" />
          </div>
      ) 
  } else if (!networkError) {
      if (recipes.length) {
          return (
            <div>
              {recipes.map((recipe, index) => (
                <div className="recipeListWrapper">
                <ExpansionPanel expanded={expanded === index} onChange={handleChange(index)}>
                  <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                      <div style={{ fontSize: '20px', fontWeight: '700' }}>{recipe.name}</div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                          <div className="recipePanelContent">
                            {recipe.versions[recipe.versions.length - 1].description}
                          </div>
                          <div className="manipulateButtonsContainer">
                              <Button variant="contained" color="secondary" style={{ margin: '2% 1% 0', background: "orange", width: '120px' }} onClick={() => handleSubmit(recipe._id, recipe.name, recipe.versions[recipe.versions.length - 1].description)}>
                                  Edit
                              </Button>
                              <Link disabled style={{ textDecoration: 'none' }} to={`/versions/${recipe._id}`}><Button disabled={recipe.versions.length < 2} variant="outlined" color="primary" style={{ margin: '2% 1% 0', width: '120px' }}>
                                  ↺ Versions
                              </Button></Link>
                              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} style={{ margin: '2% 1% 0', width: '120px' }} onClick={() => deleteRecipe(`recipe/${recipe._id}`)}>
                                  Delete
                              </Button>
                          </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
              ))}
            </div>
          )
      } else {
          return (
              <div className='emptyRecipeListAlert'>
                  <span style={{ fontWeight: '700', margin: '0 20px 0 40px' }}>⚠</span><span style={{ fontWeight: '700' }}>There are no recipes</span>
              </div>
          )
      }
  } else {
      return (
          <div className='badConnectAlert'>
              <span style={{ fontWeight: '700', margin: '0 20px 0 40px' }}>✖</span><span style={{ fontWeight: '700' }}>{networkError}</span>
          </div>
      )
  }
}

const mapStateToProps = ({ recipeList: { recipes, isLoading, networkError } }) => (
  {
      recipes,
      isLoading,
      networkError
  }
) 

const mapDispatchToProps = {
  deleteRecipe,
  callModalWindow,
  setInitialData
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)