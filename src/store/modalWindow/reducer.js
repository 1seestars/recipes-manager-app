import { SET_INITIAL_DATA, TOGGLE_MODAL_WINDOW_TYPE } from "./actions";

export const modalWindowReducer = (
  state = { initialValues: "", modalWindowType: "" },
  action
) => {
  switch (action.type) {
    case SET_INITIAL_DATA:
      return { ...state, initialValues: action.payload };
    case TOGGLE_MODAL_WINDOW_TYPE:
      return { ...state, modalWindowType: action.payload };
    default:
      return state;
  }
};
