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

  const { title, image } = metaInfo;
  const [remind, setRemind] = useState(false);
  const onToggleRemind = () => setRemind(!remind);

  const [selectedFolderId, setSelectedFolderId] = useState<ItemId>('');
  const onSelectFolder = (folderId: ItemId) => {
    setSelectedFolderId(folderId);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetaInfo({ ...metaInfo, title: e.target.value });
  };

  useEffect(() => {
    metaData.then((res) => setMetaInfo(res));
  }, [currentPageUrl]);

  const onSave = async () => {
    if (selectedFolderId === '') {
      alert('폴더를 선택해주세요');
      return;
    }
    try {
      await createDotoriAPI(metaInfo, remind, selectedFolderId);
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
      <DotoriInputBox
        title={title}
        image={image}
        remind={remind}
        onChangeTitle={onChangeTitle}
        onToggleRemind={onToggleRemind}
      />
      <DividerColumn />
      <FolderForm>
        <FolderListBox
          onSelectFolder={onSelectFolder}
          selectedFolderId={selectedFolderId}
        />
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

const DividerColumn = styled.div`
  margin: 24px 0;
  width: 1px;
  background-color: #f3f2ef;
`;

export default DotoriForm;
