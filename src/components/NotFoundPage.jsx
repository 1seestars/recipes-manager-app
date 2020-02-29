import React from "react";
import styled from "styled-components";

export const NotFoundPage = () => {
  const Container = styled.div`
    margin: 5% auto 0;
    font-size: 50px;
    width: 100%;
    text-align: center;
  `;

  return (
    <div>
      <Container>404 Not Found</Container>
      <hr />
    </div>
  );
};
