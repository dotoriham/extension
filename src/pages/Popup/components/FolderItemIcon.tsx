import React, { ReactElement } from 'react';
import { ItemId, TreeItem } from '@atlaskit/tree';
import FolderEmoji from './FolderEmoji';
import styled from 'styled-components';
import { ARROW_DOWN_ICON, ARROW_SIDE_ICON } from '../lib/constants';

interface FolderItemIconProps {
  item: TreeItem;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
}

const FolderItemIconWrapper = styled.div`
  display: flex;
`;

const ArrowButton = styled.button<{ isShow: boolean }>`
  padding: 0;
  width: 16px;
  height: 16px;
  visibility: ${(props) => !props.isShow && 'hidden'};
  border: 0px none;
  background-color: transparent;
  cursor: pointer;
  svg {
    margin-right: 2px;
  }
`;

const Image = styled.img``;

function FolderItemIcon({
  item,
  onExpand,
  onCollapse,
}: FolderItemIconProps): ReactElement {
  return (
    <FolderItemIconWrapper onMouseDown={(e) => e.stopPropagation()}>
      <ArrowButton
        isShow={item.children.length > 0}
        type="button"
        onClick={() =>
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
        }
      >
        {item.isExpanded ? (
          <Image src={ARROW_DOWN_ICON} />
        ) : (
          <Image src={ARROW_SIDE_ICON} />
        )}
      </ArrowButton>
      <FolderEmoji emoji={item.data.emoji} />
    </FolderItemIconWrapper>
  );
}

export default FolderItemIcon;
