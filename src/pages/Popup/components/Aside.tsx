import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ArrowBig16Img, Symbol32Img } from '../../assets/img';
import { MAIN_URL } from '../lib/constants';

function Aside(): ReactElement {
  const goDotoriHam = () => window.open(MAIN_URL, '_blank');

  return (
    <AsideBlock onClick={goDotoriHam}>
      <ImageBox>
        <ArrowImage src={ArrowBig16Img} />
        <SymbolImage src={Symbol32Img} />
      </ImageBox>
      <AsideLinked>도토리함</AsideLinked>
      <AsideLinked>GO</AsideLinked>
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

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ArrowImage = styled.img`
  margin-top: 2px;
  margin-right: 2px;
`;

const SymbolImage = styled.img`
  display: block;
`;

const AsideLinked = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
  height: 21px;
`;

export default Aside;
