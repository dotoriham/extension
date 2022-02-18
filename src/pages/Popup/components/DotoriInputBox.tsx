import React, { ReactElement } from 'react';
import styled from 'styled-components';

function DotoriInputBox(): ReactElement {
  return <DotoriInputBoxStyled>DotoriInput</DotoriInputBoxStyled>;
}

const DotoriInputBoxStyled = styled.div`
  margin: 24px;
  width: 150px;
`;

export default DotoriInputBox;
