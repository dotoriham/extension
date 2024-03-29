import { ItemId } from '@atlaskit/tree';
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { createDotoriAPI } from '../lib/api/dotori';
import { getMetaDataByUrl, MetaData } from '../lib/utils/metaHelper';
import DotoriInputBox from './DotoriInputBox';
import FolderListBox from './FolderListBox';
import SuccessSaveDotori from './SuccessSaveDotori';

interface DotoriFormProps {
  currentPageUrl: string;
}

function DotoriForm({ currentPageUrl }: DotoriFormProps): ReactElement {
  const [successSave, setSuccessSave] = useState(false);
  const [metaInfo, setMetaInfo] = useState<MetaData>({
    title: '',
    description: '',
    link: '',
    image: '',
  });

  const { title, image, description } = metaInfo;
  const [remind, setRemind] = useState(false);
  const onToggleRemind = () => setRemind(!remind);

  const [selectedFolderId, setSelectedFolderId] = useState<ItemId>('');
  const onSelectFolder = (folderId: ItemId) => {
    setSelectedFolderId(folderId);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetaInfo({ ...metaInfo, title: e.target.value });
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMetaInfo({ ...metaInfo, description: e.target.value });
  };

  useEffect(() => {
    const getMetaData = async () => {
      const res = await getMetaDataByUrl(currentPageUrl);
      setMetaInfo(res);
    };
    getMetaData();
  }, [currentPageUrl]);

  const onSave = async () => {
    try {
      await createDotoriAPI(metaInfo, remind, selectedFolderId);
      setSuccessSave(true);
      setTimeout(() => {
        chrome.extension.getViews({ type: 'popup' })[0].close();
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
        description={description}
        image={image}
        remind={remind}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}
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
