// import { Button } from "antd";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import styled from "styled-components";
import { useCallback, useState } from "react";

// 아이콘 가지고 올 이름
// io IoMdAddCircleOutline
// css
// 1.FormCss
// 2. FormInputCss
// 3. FormButtonCss
const FormCss = styled.form`
  display: flex;
  background: white;
`;
const FormInputCss = styled.input`
  background: #dfe5ef;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: gray;
  &::placeholder {
    font-family: "Orbit", sans-serif;
    color: gray;
  }
  flex: 1;
`;
const FormButtonCss = styled.button`
  outline: none;
  border: none;
  background: #bdc5d2;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 1s background ease-in;
  &:hover {
    background: #8992a0;
  }
`;


// 부모에서 <TodoInsert onInsert={onInsert} />

const TodoInsert = ({ onInsert }) => {
  // 추가 기능 넣기,
  // 기본 state 이용해서 작업 하기.
  const [value, setValue] = useState("");

  //이벤트 핸들러 추가
  // useCallback(콜백함수, 의존성 배열)
  // 의존성 배열 모양 , 빈 배열이라서, 최초 1회만 해당 함수를 만들겠다.
  // onChange 라는 함수를 계속 새로 만들지 말자.
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // onSubmit 라는 함수를 임의로 만들어서, 넘어온 함수를 사용하기.
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      e.preventDefault();
    },
    [onInsert, value]
  );

  // 뭔가 추가를 할때 , onClick 이라는 이벤트 핸들러 추가하고,
  // 또한, onKeyPress 라는 핸들러도 추가했음
  // 그런데
  // onSubmit 속성으로 하면 두번안해도 기본적으로 엔터 처도 추가됨

  return (
    // 적용하기. 넘어온 함수 이벤트 부분 적용하기
    <FormCss onSubmit={onSubmit}>
      <FormInputCss
        // 추가하기, state 를 이용해서, value , onChage 속성 사용하기.
        value={value}
        onChange={onChange}
        placeholder="Todo 입력해주세요"
      />
      <FormButtonCss type="submit">
        <IoMdAddCircleOutline />
      </FormButtonCss>
    </FormCss>
  );
};
export default TodoInsert;