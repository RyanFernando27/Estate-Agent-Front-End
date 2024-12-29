// components/Styles.js

import styled from "styled-components";

export const Heading = styled.h1`
  text-align: right;
  color: blue;
`;

export const Content = styled.div`
  overflowy: scroll;
  height: 2500px;
`;

export const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 90%;
  bottom: 10%;
  height: 20px;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: rgb(32, 79, 234);
`;
