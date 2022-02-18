import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Aside from '../components/Aside';
import DotoriForm from '../components/DotoriForm';
import LoginForm from '../components/LoginForm';

interface MainPageProps {
  isLogin: boolean;
}

function MainPage({ isLogin }: MainPageProps): ReactElement {
  return (
    <MainPageContainer>
      <Aside />
      <FormBlock>{isLogin ? <DotoriForm /> : <LoginForm />}</FormBlock>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  display: flex;
  height: 100%;
`;

const FormBlock = styled.div`
  flex: 1 0 auto;
`;

export default MainPage;
