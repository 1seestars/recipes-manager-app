import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAllRecipes } from '../../store/recipeList/actions'
import { callModalWindow, setInitialData } from '../../store/modalWindow/actions'
import { connect } from 'react-redux';

export const HeadButtons = ({ recipes, networkError, deleteAllRecipes, callModalWindow }) => {
    const handleSubmit = () => {
        callModalWindow('add')
        setInitialData('')
    }

    return (
        <div className="headButtonsContainer">
            <Button disabled={!!networkError || !recipes.length} variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteAllRecipes}>
                Delete All
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
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
    callModalWindow,
    setInitialData
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HeadButtons)