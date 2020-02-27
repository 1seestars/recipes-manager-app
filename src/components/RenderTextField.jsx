import React from "react";
import TextField from "@material-ui/core/TextField";

export const RenderTextField = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error }
}) => (
  <>
    <div>
      <TextField
        label={label}
        multiline={label === "Description"}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...input}
        variant={"outlined"}
      />
    </div>
    <div>
      {touched && error && <span>{error}</span>}
    </div>
  </>
);