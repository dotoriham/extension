import React, { ReactElement } from 'react';
import styled from 'styled-components';
import DotoriInputBox from './DotoriInputBox';
import FolderListBox from './FolderListBox';

function DotoriForm(): ReactElement {
  return (
    <DotoriFormBlock>
      <DotoriInputBox />
      <FolderListBox />
    </DotoriFormBlock>
  );
}

const DotoriFormBlock = styled.div`
  display: flex;
`;

export default DotoriForm;
