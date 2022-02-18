import React, { ReactElement } from 'react';
import styled from 'styled-components';

function FolderListBox(): ReactElement {
  return <FolderListBoxStyled>FolderListBox</FolderListBoxStyled>;
}

const FolderListBoxStyled = styled.div`
  width: 170px;
  margin: 24px;
`;

export default FolderListBox;
