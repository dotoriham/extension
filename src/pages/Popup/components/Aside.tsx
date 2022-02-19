import React, { ReactElement } from 'react';
import styled from 'styled-components';

function Aside(): ReactElement {
  const goDotoriHam = () => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: 'https://dotoriham.com/',
      });
    }
  };

  return (
    <AsideBlock onClick={goDotoriHam}>
      <HomeImage src="https://i.ibb.co/zmc2Vcy/Home-24.png" />
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
