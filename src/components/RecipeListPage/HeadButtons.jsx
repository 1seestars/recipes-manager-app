import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAllRecipes, callModalWindow } from '../../store/recipesList/actions'
import { connect } from 'react-redux';

export const HeadButtons = ({ recipes, networkError, deleteAllRecipes, callModalWindow }) => {
    return(
        <div className="headButtonsContainer">
            <Button disabled={!!networkError || !recipes.length} variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteAllRecipes}>
                Delete All
            </Button>
            <Button variant="contained" color="primary" onClick={() => callModalWindow('add')}>
                ✚ Add
            </Button>
        </div>
    )
}

const mapStateToProps = ({ recipeList: { recipes, networkError } }) => (
    {
        recipes,
        networkError
    }
) 

const mapDispatchToProps = {
    deleteAllRecipes,
    callModalWindow
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HeadButtons)