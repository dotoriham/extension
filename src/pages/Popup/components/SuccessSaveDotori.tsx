import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SYMBOL_ICON } from '../lib/constants';

function SuccessSaveDotori(): ReactElement {
  return (
    <SuccessSaveDotoriStyled>
      <Logo src={SYMBOL_ICON} />
      <LogoText>도토리가 저장되었어요!</LogoText>
    </SuccessSaveDotoriStyled>
  );
}

const SuccessSaveDotoriStyled = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.img``;

const LogoText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #0baa78;
`;

export default SuccessSaveDotori;
