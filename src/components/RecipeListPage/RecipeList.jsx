import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { connect } from 'react-redux';
import { callModalWindow } from '../../store/recipesList/actions'
import CircularProgress from '@material-ui/core/CircularProgress';

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

const RecipeList = ({ recipes, modalWindowType, isLoading, networkError, callModalWindow }) => {
  const [expanded, setExpanded] = React.useState();

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (isLoading) {
      return (
          <div style={{ width: '100%', padding: '150px 0', textAlign: 'center' }}>
              <CircularProgress color='#3f51b5' />
          </div>
      ) 
  } else if (!networkError) {
    console.log(recipes)
      if (recipes.length) {
          return (
            <div>
              {recipes.map((recipe, index) => (
                <div className="recipeListWrapper">
                <ExpansionPanel expanded={expanded === index} onChange={handleChange(index)}>
                  <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>{recipe.name}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <Typography>
                          <div className="recipePanelContent">
                            {recipe.versions[recipe.versions.length - 1].description}
                          </div>
                          <div className="manipulateButtonsContainer">
                              <Button variant="contained" color="secondary" style={{ margin: '2% 1% 0', background: "orange", width: '120px' }} onClick={() => callModalWindow('change')}>
                                  Edit
                              </Button>
                              <Button variant="outlined" color="primary" style={{ margin: '2% 1% 0', width: '120px' }}>
                                  ↺ Versions
                              </Button>
                              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} style={{ margin: '2% 1% 0', width: '120px' }}>
                                  Delete
                              </Button>
                          </div>
                      </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
              ))}
            </div>
          )
      } else {
          return (
              <div className='emptyRecipeListAlert'>
                  <span style={{ fontWeight: '700', margin: '0 20px 0 40px' }}>⚠</span><span style={{ fontWeight: '700' }}>There are no recipes:</span><span> click "ADD" button</span>
              </div>
          )
      }
  } else {
    console.log('oshibka')
      return (
          <div className='badConnectAlert'>
              <span style={{ fontWeight: '700', margin: '0 20px 0 40px' }}>✖</span><span style={{ fontWeight: '700' }}>{networkError}</span>
          </div>
      )
  }
}

const mapStateToProps = ({ recipeList: { recipes, modalWindowType, isLoading, networkError } }) => (
  {
      recipes,
      modalWindowType,
      isLoading,
      networkError
  }
) 

const mapDispatchToProps = {
  callModalWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)