import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { HOME_ICON, MAIN_URL } from '../lib/constants';

function Aside(): ReactElement {
  const goDotoriHam = () => window.open(MAIN_URL, '_blank');

  return (
    <AsideBlock onClick={goDotoriHam}>
      <HomeImage src={HOME_ICON} />
      <AsideLinked>도토리함 가기</AsideLinked>
    </AsideBlock>
  );
}

const AsideBlock = styled.div`
  height: 100%;
  width: 174px;
  padding: 24px;
  cursor: pointer;
  background-color: #48bf91;
`;

const HomeImage = styled.img`
  display: block;
  margin-bottom: 8px;
  width: 24px;
  height: 24px;
`;

const AsideLinked = styled.span`
  color: #ffffff;
  font-size: 16px;
`;

export default Aside;
