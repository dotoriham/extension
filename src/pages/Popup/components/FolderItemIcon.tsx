import React, { ReactElement } from 'react';
import { ItemId, TreeItem } from '@atlaskit/tree';
import FolderEmoji from './FolderEmoji';
import styled from 'styled-components';

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
          <Image src="https://images.velog.io/images/ksmfou98/post/47ee02fd-78f1-43b6-81d9-881d6e3b3ffa/Arrow_down_s.png" />
        ) : (
          <Image src="https://images.velog.io/images/ksmfou98/post/1d15c5b9-70eb-4b16-b20f-b15c8f602cf1/Arrow_side_s.png" />
        )}
      </ArrowButton>
      <FolderEmoji emoji={item.data.emoji} />
    </FolderItemIconWrapper>
  );
}

export default FolderItemIcon;
