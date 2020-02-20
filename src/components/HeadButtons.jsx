import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';

export const HeadButtons = props => {
    return(
        <div className="headButtonsContainer">
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete All
            </Button>
            <Button variant="contained" color="primary">
                ✚ Add
            </Button>
        </div>
    )
}