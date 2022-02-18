import React, { ReactElement } from 'react';

import styled from 'styled-components';

interface FolderEmojiProps {
  emoji?: string;
}

const FolderIconStyled = styled.div`
  margin-right: 4px;
`;

const EmojiIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

function FolderEmoji({ emoji }: FolderEmojiProps): ReactElement {
  return <>{emoji ? <EmojiIcon /> : <FolderIconStyled />}</>;
}

export default FolderEmoji;
