import React from "react";
import Modal from "@material-ui/core/Modal";
import { compose } from "redux";
import { connect } from "react-redux";
import validate from '../../validation/validateRecipeInput'
import { toggleModalWindowType } from "../../store/modalWindow/actions";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { RenderTextField } from "../RenderTextField";

const ModalWindow = ({
  modalWindowType,
  toggleModalWindowType,
  handleSubmit,
  pristine,
  reset,
  submitting
}) => {
  const submitAction = values => {
    handleSubmit(values);
    reset();
  };

  const closeWindow = () => {
    toggleModalWindowType("");
    reset();
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!modalWindowType}
      >
        <div className="modalWindow">
          <div style={{ width: "100%", textAlign: "right" }}>
            <button
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "none",
                outline: "none",
                lineHeight: "20px",
                fontSize: "20px",
                margin: "5px 5px 0 0",
                cursor: "pointer",
                textAlign: "center"
              }}
              onClick={closeWindow}
            >
              &times;
            </button>
          </div>
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
                component={RenderTextField}
                label="Description"
                type="text"
              />
            </div>
            <div className="modalWindowButtons">
              <Button
                disabled={pristine || submitting}
                variant="contained"
                style={{ width: "120px", margin: "0 5px" }}
                type="button"
                onClick={reset}
              >
                Clear
              </Button>
              <Button
                disabled={pristine || submitting}
                variant="contained"
                color="primary"
                style={{ width: "120px", margin: "0 5px" }}
                type="submit"
              >
                {modalWindowType}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  modalWindow: { modalWindowType, initialValues }
}) => ({
  modalWindowType,
  initialValues
});

const mapDispatchToProps = {
  toggleModalWindowType
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "recipeForm", enableReinitialize: true, validate })
)(ModalWindow);
