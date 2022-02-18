import React, { ReactElement } from 'react';
import styled from 'styled-components';

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

function FolderEmoji({ emoji }: FolderEmojiProps): ReactElement {
  return (
    <>
      {emoji ? (
        <EmojiIcon />
      ) : (
        <FolderIconStyled src="https://images.velog.io/images/ksmfou98/post/bfced404-c12b-4fc7-98d0-05ce7a36f2de/Folder_16.png" />
      )}
    </>
  );
}

export default FolderEmoji;
