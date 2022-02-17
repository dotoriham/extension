import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import GlobalStyles from './globalStyles';

export interface TodoType {
  id: number;
  text: string;
  done: boolean;
}

function getStorage() {
  const userToken = localStorage.getItem('userToken') || '';
  return JSON.parse(userToken);
}

function executeScript(callback: any) {
  if (chrome?.tabs?.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      const tabId: any = tab[0].id;
      const exec = chrome.scripting.executeScript;
      exec(
        { target: { tabId: tabId }, function: getStorage },
        function (response) {
          console.log(response);
          callback && callback(response[0].result); // 있을 경우에만 리턴하도록 설정 없으면 아무것도 리턴 안하니간 local에 저장 안될테니 걱정 ㄴㄴ;
        },
      );
    });
  }
}

const Popup = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const login = (): void => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: 'https://dotoriham.com/login',
      });
    }
  };

  useEffect(() => {
    const fetch = () => {
      executeScript(async function (response: any) {
        console.log('response', response);
        localStorage.setItem('userToken', JSON.stringify(response));
      });
    };

    const getFolderData = async () => {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const { accessToken, refreshToken } = JSON.parse(userToken);
        const res = await axios.get(
          `https://dotoriham.duckdns.org/api/v1/page/main?page=0&size=9&sort=saveTime,desc&remind=false`,
          {
            headers: {
              accessToken: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          },
        );
        console.log('찐', res);
      }
    };
    fetch();
    getFolderData();
  }, []);

  const onInsert = (text: string) => {
    const todo = {
      id: Date.now(),
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = (id: number) => {
    console.log(id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const onRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <PopupBlock>
      <GlobalStyles />
      <div className="title">오늘 할일sd</div>
      <button onClick={login}>로그인</button>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </PopupBlock>
  );
};

const PopupBlock = styled.div`
  .title {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #22b8cf;
    color: #fff;
    font-weight: 600;
  }
`;

export default Popup;
