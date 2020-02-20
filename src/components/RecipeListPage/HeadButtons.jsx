import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { callModalWindow } from '../../store/recipesList/actions'
import { connect } from 'react-redux';

export const HeadButtons = ({ callModalWindow }) => {
    return(
        <div className="headButtonsContainer">
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete All
            </Button>
            <Button variant="contained" color="primary" onClick={() => callModalWindow('add')}>
                ✚ Add
            </Button>
        </div>
    )
}

const mapDispatchToProps = {
    callModalWindow
}
  
export default connect(null, mapDispatchToProps)(HeadButtons)