import React from "react";
import TextField from "@material-ui/core/TextField";
import styled, { css } from "styled-components";

const TextFieldContainer = styled.div`
  ${props =>
    props.margin &&
    css`
      margin: 0 0 4%;
    `}
`;

const ErrorContainer = styled.div`
  width: 100%;
  text-align: left;
  color: red;
  margin: 1% 0 0;
  font-size: 15px;
`;

export const RenderTextField = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error }
}) => (
  <>
    <TextFieldContainer margin={label !== "Description" ? true : undefined}>
      <TextField
        label={label}
        multiline={label === "Description"}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...input}
        variant={label === "Description" ? "outlined" : undefined}
        autoFocus={label !== "Description" ? true : false}
        fullWidth
      />
      <ErrorContainer>
        {touched && error && <span>{error}</span>}
      </ErrorContainer>
    </TextFieldContainer>
  </>
);
