import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import GlobalStyles from './lib/styles/globalStyles';
import getTokens from './lib/getTokens';
import MainPage from './page/MainPage';

export interface TodoType {
  id: number;
  text: string;
  done: boolean;
}

function executeScript(callback: (url: string) => Promise<void>) {
  if (chrome?.tabs?.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      const tabId = tab[0].id;
      const exec = chrome.scripting.executeScript;
      exec(
        { target: { tabId: tabId! }, function: getTokens },
        function (response) {
          callback && callback(tab[0].url!); // 있을 경우에만 리턴하도록 설정 없으면 아무것도 리턴 안하니간 local에 저장 안될테니 걱정 ㄴㄴ;
        },
      );
    });
  }
}

function Popup(): ReactElement {
  const [isLogin, setIsLogin] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['DOTORI_USER'], function (result) {
      const userToken = result.DOTORI_USER;
      setIsLogin(userToken ? true : false);
      localStorage.setItem('DOTORI_USER', JSON.stringify(userToken));
    });
  }, []);

  useEffect(() => {
    const fetch = () => {
      executeScript(async function (url: string) {
        setCurrentPageUrl(url);
      });
    };

    fetch();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PopupContainer>
        <GlobalStyles />
        <MainPage isLogin={isLogin} currentPageUrl={currentPageUrl} />
      </PopupContainer>
    </QueryClientProvider>
  );
}

const PopupContainer = styled.div`
  height: 100%;
`;

export default Popup;
