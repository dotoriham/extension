import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { getStorageTokens } from './getStorageTokens';

export interface TodoType {
  id: number;
  text: string;
  done: boolean;
}

function getStorage() {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
}

function executeScript(msg: any, callback: any) {
  if (chrome?.tabs?.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      const tabId: any = tab[0].id;
      const exec = chrome.scripting.executeScript;
      console.log('exec', exec);
      console.log('tabId', tabId);

      exec(
        { target: { tabId: tabId }, function: getStorage },
        function (response) {
          console.log(response);
          callback && callback(response[0].result);
        },
      );

      //   exec(tabId, { code: `var msg = ${JSON.stringify(msg)}` }, function () {
      //     if (chrome.runtime.lastError) {
      //       console.log(chrome.runtime.lastError.message);
      //       callback && callback(undefined);
      //       return;
      //     }

      //     exec(tabId, { file: 'inject.js' }, function (response) {
      //       callback && callback(response[0]);
      //     });
      //   });
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
      const { refreshToken: userRefreshToken, accessToken: userAccessToken } =
        getStorageTokens();
      executeScript({ what: 'get', type: 'L' }, async function (response: any) {
        console.log('response', response);
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        let checkIsLogin = accessToken ? !!accessToken : !!userAccessToken;
        localStorage.setItem(
          'refreshToken',
          refreshToken ? refreshToken : userRefreshToken,
        );
        localStorage.setItem(
          'accessToken',
          accessToken ? accessToken : userAccessToken,
        );
        console.log(
          accessToken,
          refreshToken,
          userAccessToken,
          userRefreshToken,
        );
      });
    };
    fetch();
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
