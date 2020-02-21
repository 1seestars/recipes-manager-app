import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { callModalWindow, addRecipe } from '../../store/recipeList/actions'
import { Field, reduxForm } from 'redux-form'
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
      minHeight: '30%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1%',
      outline: 'none',
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center'
    },
  }),
);

const RenderTextField = ({ input, placeholder, label, type, meta: { touched, error } }) => (
    <>
        <div>
            <TextField 
                label={label} 
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                {...input} 
                variant="outlined"
                style={{ width: '100%', margin: '5% 0 8%' }}
            />
        </div>
        <div>
            {touched && error && <span className="errorSpan">{error}</span>}
        </div>
    </>
)


const RenderTextareaField = ({ input, placeholder, label, type, meta: { touched, error } }) => (
    <>
        <div>
        <TextField
          label={label} 
          multiline
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...input}
          variant="outlined"
          style={{ width: '100%', margin: '4% 0 4%' }}
        />
        </div>
        <div>
            {touched && error && <span className="errorSpan">{error}</span>}
        </div>
    </>
)

const ModalWindow = ({ recipes, modalWindowType, callModalWindow, addRecipe, handleSubmit, pristine, reset, submitting, currentId }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const submitAction = values => {
    handleSubmit(values)
    reset()
  }

  const closeWindow = () => {
    callModalWindow('')
    reset()
  }
  
  const currentRecipe = recipes.find(item => item._id === currentId)
  const showName = !!currentRecipe ? currentRecipe.name : ''
  const showDescription = !!currentRecipe ? currentRecipe.versions[currentRecipe.versions.length - 1].description : ''

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!modalWindowType}
      >
        <div style={modalStyle} className={classes.paper}>
        <div style={{ width: '100%', textAlign: 'right' }}><button style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', outline: 'none', lineHeight: '20px', fontSize: '20px', margin: '0 -15px 0 0', cursor: 'pointer', textAlign: 'center' }} onClick={closeWindow}>&times;</button></div>
        <form onSubmit={submitAction}>
          <div className="formWrapper">
            <Field
                name="name"
                component={RenderTextField}
                label="Recipe name"
                type="text"
            />
            <Field
                name="description"
                component={RenderTextareaField}
                label="Description"
                type="text"
            />
          </div>
  <div><Button disabled={pristine || submitting} variant="contained" style={{ width: '120px', margin: '0 5px' }} type='button' onClick={reset}>Clear</Button><Button disabled={pristine || submitting} variant="contained" color="primary" style={{ width: '120px', margin: '0 5px' }} type='submit'>{modalWindowType}</Button></div>
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

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({ form: 'recipeForm', enableReinitialize: true }))(ModalWindow)