import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { callModalWindow, addRecipe } from '../../store/recipesList/actions'
import { reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'

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
      minHeight: '40%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1%',
      outline: 'none',
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center'
    },
  }),
);

const ModalWindow = ({ recipes, modalWindowType, isLoading, networkError, callModalWindow, addRecipe }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      name: 'lalalalal',
      description: 'polnaya pizda'
    }
    addRecipe(body)
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!modalWindowType}
      >
        <div style={modalStyle} className={classes.paper}>
        <div style={{ width: '100%', textAlign: 'right' }}><button style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', outline: 'none', lineHeight: '20px', fontSize: '20px', margin: '0 -15px 0 0', cursor: 'pointer', textAlign: 'center' }} onClick={() => callModalWindow('')}>&times;</button></div>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="formWrapper">
            
            <div><TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ width: '100%', margin: '4% 0 8%' }} /></div>
            <div><textarea onChange={e => console.log(e.target.value)}></textarea></div>
          </div>
  <div><Button variant="contained" style={{ width: '120px', margin: '1% 5px 0' }}>Clear</Button><Button variant="contained" color="primary" style={{ width: '120px', margin: '1% 5px 0' }} type='submit'>{modalWindowType}</Button></div>
  </form>
        </div>
      </Modal>
    </div>
  );
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
  callModalWindow,
  addRecipe
}

export default compose(reduxForm({ form: 'recipeForm' }), connect(mapStateToProps, mapDispatchToProps))(ModalWindow)