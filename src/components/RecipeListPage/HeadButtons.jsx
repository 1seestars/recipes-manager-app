import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { callModalWindow } from '../../store/recipesList/actions'
import { connect } from 'react-redux';

export const HeadButtons = ({ recipes, isLoading, networkError, callModalWindow }) => {
    return(
        <div className="headButtonsContainer">
            <Button disabled={isLoading || !!networkError || !recipes} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete All
            </Button>
            <Button variant="contained" color="primary" onClick={() => callModalWindow('add')}>
                ✚ Add
            </Button>
        </div>
    )
}

const mapStateToProps = ({ recipeList: { recipes, isLoading, networkError } }) => (
    {
        recipes,
        isLoading,
        networkError
    }
) 

const mapDispatchToProps = {
    callModalWindow
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HeadButtons)