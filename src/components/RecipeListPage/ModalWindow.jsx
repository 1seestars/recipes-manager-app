import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { callModalWindow } from '../../store/recipesList/actions'
import { reduxForm } from 'redux-form'

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '40%',
      minHeight: '60%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1%',
      outline: 'none',
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center'
    },
  }),
);

const ModalWindow = ({ modalWindowType, callModalWindow }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!modalWindowType}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="formWrapper">
            <div><button onClick={() => callModalWindow('')}>Cross</button></div>
            <div><TextField autoFocus id="outlined-basic" label="Outlined" variant="outlined" style={{ width: '100%', margin: '5% 0 8%' }} /></div>
            <div><textarea></textarea></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ recipeList: { modalWindowType } }) => (
  {
    modalWindowType
  }
) 

const mapDispatchToProps = {
  callModalWindow
}

export default compose(reduxForm({ form: 'recipeForm' }), connect(mapStateToProps, mapDispatchToProps))(ModalWindow)