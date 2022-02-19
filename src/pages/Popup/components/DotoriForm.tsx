import { ItemId } from '@atlaskit/tree';
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { createDotoriAPI } from '../lib/api/dotori';
import { getMetaDataByUrl } from '../lib/utils/metaHelper';
import DotoriInputBox from './DotoriInputBox';
import FolderListBox from './FolderListBox';
import SuccessSaveDotori from './SuccessSaveDotori';

interface DotoriFormProps {
  currentPageUrl: string;
}

function DotoriForm({ currentPageUrl }: DotoriFormProps): ReactElement {
  const [successSave, setSuccessSave] = useState(false);
  const metaData = getMetaDataByUrl(currentPageUrl);
  const [metaInfo, setMetaInfo] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
  });
  const [selectedFolderId, setSelectedFolderId] = useState<ItemId>('');

  const onSelectFolder = (folderId: ItemId) => {
    setSelectedFolderId(folderId);
  };

  useEffect(() => {
    metaData.then((res) => setMetaInfo(res));
  }, [currentPageUrl]);

  const onSave = async () => {
    try {
      console.log('api 쏜다!', metaInfo, selectedFolderId);
      await createDotoriAPI(metaInfo, selectedFolderId);
      setSuccessSave(true);
      setTimeout(() => {
        setSuccessSave(false);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  if (successSave) return <SuccessSaveDotori />;

  return (
    <DotoriFormBlock>
      <DotoriInputBox />
      <FolderForm>
        <FolderListBox onSelectFolder={onSelectFolder} />
        <SaveButton onClick={onSave}>저장하기</SaveButton>
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
