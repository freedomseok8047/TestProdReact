import React from 'react';
import styled from'styled-components';
import { AiFillAndroid } from "react-icons/ai";
import { AiFillApple } from "react-icons/ai";
// css 구성요소
// TodoBaseTemp
// AppTitle
// Content

const TodoBaseTemp = styled.div`
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;
const AppTitle = styled.div`
  background: #616b7a;
  color: white;
  height: 4rem;
  font-size: 1.8rem;
  font-family: 'Orbit', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  background: #9BBEC8;
`;

const TodoBase = ({children}) => {
  return (
      <TodoBaseTemp>
        <AppTitle>
          <AiFillApple/> 일정관리 미니프로잭트
        </AppTitle>
        <Content>
          {children}
        </Content>
      </TodoBaseTemp>
  );
};

export default TodoBase;