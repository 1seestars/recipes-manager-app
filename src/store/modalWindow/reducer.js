import { SET_INITIAL_DATA, TOGGLE_MODAL_WINDOW } from "./actions";

export const modalWindowReducer = (
  state = { initialValues: {}, isModalOpen: false },
  action
) => {
  switch (action.type) {
    case SET_INITIAL_DATA:
      return { ...state, initialValues: action.payload };
    case TOGGLE_MODAL_WINDOW:
      return { ...state, isModalOpen: action.payload };
    default:
      return state;
  }
};
