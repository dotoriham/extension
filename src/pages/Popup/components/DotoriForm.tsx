import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { getMetaDataByUrl } from '../lib/utils/metaHelper';
import DotoriInputBox from './DotoriInputBox';
import FolderListBox from './FolderListBox';

interface DotoriFormProps {
  currentPageUrl: string;
}

function DotoriForm({ currentPageUrl }: DotoriFormProps): ReactElement {
  const metaData = getMetaDataByUrl(currentPageUrl);

  useEffect(() => {
    metaData.then((res) => console.log('meta', res));
  }, [currentPageUrl]);

  return (
    <DotoriFormBlock>
      <DotoriInputBox />
      <FolderForm>
        <FolderListBox />
        <SaveButton>저장하기</SaveButton>
      </FolderForm>
    </DotoriFormBlock>
  );
}

const DotoriFormBlock = styled.div`
  display: flex;
  height: 100%;
`;

const FolderForm = styled.div`
  width: 170px;
  margin: 24px;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #48bf91;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
`;

export default DotoriForm;
