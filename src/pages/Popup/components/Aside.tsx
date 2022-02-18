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
    <AsideBlock>
      <AsideLinked onClick={goDotoriHam}>도토리함 가기</AsideLinked>
    </AsideBlock>
  );
}

const AsideBlock = styled.div`
  height: 100%;
  width: 174px;
  padding: 24px;
  background-color: #48bf91;
`;

const AsideLinked = styled.span`
  color: #ffffff;
  font-size: 16px;
`;

export default Aside;
