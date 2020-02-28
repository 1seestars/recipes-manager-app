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
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialogActions = styled(DialogActions)`
  && {
    justify-content: center;
  }
`;

const ActionButton = styled(Button)`
  width: 100px;
`;

const StyledDialogWrapper = styled.div`
  text-align: right;
`;

const StyledDialogContent = styled(DialogContent)`
  && {
    width: 28vw;
    @media (max-width: 800px) {
      width: 70vw;
    }
  }
`;

const CloseButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 25px;
  height: 25px;
  font-size: 20px;
  margin: 1% 1% 0;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  :active {
    transform: scale(1.2);
  }
`;

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

  const clearButtonInner = values => {
    if (values) {
      return "Undo";
    } else {
      return "Clear";
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} TransitionComponent={Transition}>
        <StyledDialogWrapper>
          <CloseButton onClick={() => changeModalState(false)}>
            &times;
          </CloseButton>
          <form onSubmit={handleSubmit}>
            <StyledDialogContent>
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
            </StyledDialogContent>
            <StyledDialogActions>
              <ActionButton
                disabled={pristine || submitting}
                variant="contained"
                type="button"
                onClick={reset}
              >
                {clearButtonInner(initialValues.id)}
              </ActionButton>
              <ActionButton
                disabled={pristine || submitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {submitButtonInner(
                  isModalSubmitButtonLoading,
                  initialValues.id
                )}
              </ActionButton>
            </StyledDialogActions>
          </form>
        </StyledDialogWrapper>
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
