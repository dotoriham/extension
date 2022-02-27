import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { MAIN_URL, SYMBOL_ICON } from '../lib/constants';

function LoginForm(): ReactElement {
  const goLogin = () => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: `${MAIN_URL}/login`,
      });
    }
  };

  const goSignup = () => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: `${MAIN_URL}/register`,
      });
    }
  };

  return (
    <LoginFormBlock>
      <Logo src={SYMBOL_ICON} />
      <LogoText>로그인 후 사용하실 수 있어요!</LogoText>
      <LoginButtonGroups>
        <LoginButton onClick={goLogin}>로그인</LoginButton>
        <SignupButton onClick={goSignup}>회원가입</SignupButton>
      </LoginButtonGroups>
    </LoginFormBlock>
  );
}

const LoginFormBlock = styled.div`
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

const LoginButtonGroups = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button`
  width: 172px;
  height: 40px;
  color: #ffffff;
  font-size: 14px;
  background-color: #48bf91;
  margin-bottom: 12px;
  border-radius: 6px;
`;

const SignupButton = styled.button`
  width: 172px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #aaaaaa;
  font-size: 14px;
  color: #323232;
`;

export default LoginForm;
