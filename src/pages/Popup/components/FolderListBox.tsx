import Tree, {
  ItemId,
  mutateTree,
  RenderItemParams,
  TreeData,
} from '@atlaskit/tree';
import React, { ReactElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useFolderListQuery from '../hooks/useFolderListQuery';
import { PLUS_ICON } from '../lib/constants';
import { scrollbar } from '../lib/styles/utilStyles';
import FolderItemIcon from './FolderItemIcon';

interface FolderListBoxProps {
  onSelectFolder: (folderId: ItemId) => void;
  selectedFolderId: ItemId;
}

function FolderListBox({
  onSelectFolder,
  selectedFolderId,
}: FolderListBoxProps): ReactElement {
  const { data } = useFolderListQuery();
  const [folders, setFolders] = useState<TreeData>({
    rootId: '',
    items: {
      '': {
        id: '',
        children: [],
        data: '',
      },
    },
  });

  useEffect(() => {
    if (!data) return;
    setFolders(data);
  }, [data]);

  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const renderFolderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams): ReactElement => {
    return (
      <>
        <FolderItemWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FolderItemBlock
            active={selectedFolderId === item.id}
            onClick={() =>
              item.children.length > 0 && item.isExpanded
                ? onCollapse(item.id)
                : onExpand(item.id)
            }
          >
            <FolderLeftBox>
              <FolderItemIcon
                item={item}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
              <FolderTitle
                active={selectedFolderId === item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFolder(item.id);
                }}
              >
                {item.data.name}
              </FolderTitle>
            </FolderLeftBox>

            <FolderRightBox
              className="right"
              onClick={(e) => e.stopPropagation()}
            >
              <FolderAddButton onClick={() => console.log('더하기')}>
                <img src={PLUS_ICON} alt="더하기 버튼" />
              </FolderAddButton>
            </FolderRightBox>
          </FolderItemBlock>
        </FolderItemWrapper>
      </>
    );
  };

  return (
    <FolderListBoxStyled>
      <FolderListWrapper>
        <Tree
          tree={folders}
          renderItem={renderFolderItem}
          onExpand={onExpandFolder}
          onCollapse={onCollapseFolder}
          offsetPerLevel={16} // 한 깊이당 padding 값
          isNestingEnabled
        />
      </FolderListWrapper>
    </FolderListBoxStyled>
  );
}

const FolderListBoxStyled = styled.div`
  height: 280px;
  overflow: auto;
  margin-bottom: 20px;
  ${scrollbar};
`;

const FolderListWrapper = styled.div`
  position: relative;
`;

const FolderItemWrapper = styled.div`
  width: 156px;
`;

const FolderRightBox = styled.div`
  display: none;
  align-items: center;
`;

const FolderItemBlock = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-width: 105px;
  max-width: 166px;
  height: 28px;
  font-size: 12px;
  padding: 5px 2px;
  border-radius: 4px;
  ${(props) =>
    props.active &&
    css`
      background-color: rgba(72, 191, 145, 0.1);
      font-weight: 500;
      ${FolderRightBox} {
        display: flex;
      }
    `}
  &:hover {
    background-color: rgba(72, 191, 145, 0.1);
    font-weight: 500;
    ${FolderRightBox} {
      display: flex;
    }
  }
`;

const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 65px;
`;

const FolderTitle = styled.span<{ active: boolean }>`
  cursor: pointer;
  height: 28px;
  line-height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
  ${(props) =>
    props.active &&
    css`
      font-weight: 500;
      color: #48bf91;
    `}
`;

const FolderAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export default FolderListBox;
