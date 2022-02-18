import React, { ReactElement } from 'react';
import styled from 'styled-components';

function DotoriInputBox(): ReactElement {
  return (
    <DotoriInputBoxStyled>
      <TitleInput type="text" placeholder="제목을 입력해주세요" />
    </DotoriInputBoxStyled>
  );
}

const DotoriInputBoxStyled = styled.div`
  margin: 24px;
  width: 150px;
`;

const TitleInput = styled.input`
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 4px;
  font-size: 12px;
  padding: 5px 12px 6px 8px;
`;

export default DotoriInputBox;
