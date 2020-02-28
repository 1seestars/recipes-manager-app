import styled from "styled-components";

export const MessageContainer = styled.div`
  width: 100%;
  line-height: 25px;
  font-weight: 700;
  border-radius: 10px;
  font-size: 20px;
  box-sizing: border-box;
  color: #540800;
  padding: 4%;
  background: ${props => props.background};
`;

export const MessageSymbol = styled.span`
  margin: 0 20px;
`;
