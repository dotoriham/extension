import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FOLDER_ICON } from '../lib/constants';

interface FolderEmojiProps {
  emoji?: string;
}

const FolderIconStyled = styled.img`
  margin-right: 4px;
`;

const EmojiIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export function unifiedToNative(unified: string) {
  const codePoints = unified.split('-').map((u) => parseInt(u, 16));
  return String.fromCodePoint.apply(String, codePoints);
}

function FolderEmoji({ emoji }: FolderEmojiProps): ReactElement {
  return (
    <>
      {emoji ? (
        <EmojiIcon>{unifiedToNative(emoji)}</EmojiIcon>
      ) : (
        <FolderIconStyled src={FOLDER_ICON} />
      )}
    </>
  );
}

export default FolderEmoji;
