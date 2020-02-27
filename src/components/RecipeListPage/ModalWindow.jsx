import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { compose } from "redux";
import { connect } from "react-redux";
import validate from "../../validation/validateRecipeInput";
import { Field, reduxForm } from "redux-form";
import { RenderTextField } from "../RenderTextField";
import { changeModalState } from "../../store/modalWindow/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import red from "@material-ui/core/colors/red";

const ModalWindow = ({
  initialValues,
  isModalOpen,
  isModalSubmitButtonLoading,
  changeModalState,
  handleSubmit,
  pristine,
  reset,
  submitting
}) => {
  if (!isModalOpen) reset();

  const submitButtonInner = (loading, values) => {
    if (loading) {
      return <CircularProgress size={24} color={red[500]} />;
    } else {
      if (values) {
        return "Change";
      } else {
        return "Add";
      }
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen}>
        <button onClick={() => changeModalState(false)}>&times;</button>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Field
              name="name"
              component={RenderTextField}
              label="Recipe name"
              type="text"
            />
            <Field
              name="description"
              component={RenderTextField}
              label="Description"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={pristine || submitting}
              variant="contained"
              type="button"
              onClick={reset}
            >
              Clear
            </Button>
            <Button
              disabled={pristine || submitting}
              variant="contained"
              color="primary"
              type="submit"
            >
              {submitButtonInner(isModalSubmitButtonLoading, initialValues.id)}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({
  modalWindow: { initialValues, isModalOpen },
  recipeList: { isModalSubmitButtonLoading }
}) => ({
  initialValues,
  isModalOpen,
  isModalSubmitButtonLoading
});

const mapDispatchToProps = {
  changeModalState
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "recipeForm", enableReinitialize: true, validate })
)(ModalWindow);
