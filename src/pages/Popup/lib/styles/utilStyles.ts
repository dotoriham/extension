import { css } from 'styled-components';

export const scrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d4d2cf;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
`;
