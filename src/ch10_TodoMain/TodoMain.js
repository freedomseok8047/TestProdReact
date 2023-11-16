// 현재
// 부모 : App.js
// 자식 : TodoMain.js
// 1) 제목 2) 입력란 3)리스트 4)리스트의 아이템
import React, { useCallback,useRef,useReducer } from "react";
// import { useState } from "react";
import styled from "styled-components";

// import { AiFillAndroid } from "react-icons/ai";
// import { AiFillApple } from "react-icons/ai";
import TodoBase from "./TodoBase";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

const MainCss = styled.div`
  margin: 0;
  padding: 0;
  font-size: 30px;
  font-family: "Orbit", sans-serif;
  // 회색, 배경은 본인 취향
  background: #3c4656;
  color: white;
`;

// Todo 만들기 준비 메인 <AiFillApple />
const TodoMain = () => {
   //문제점 제시, 더미 데이터 약 20,000개로 추가하고,
  //느려지는 부분 만든 후, 확인, 적용해보기.

  const createBulkTodos = () => {
    const array = [];
    for (let i = 1; i <= 20000; i++) {
      array.push({
        id: i,
        text: `더미 데이터 : ${i}`,
        checked: false,
      });
    }
    return array;
  };
  // createBulkTodos() 의 결과 배열 -> todos 의 초깃값으로 설정.
  // const [todos, setTodos] = useState(createBulkTodos());

  //샘플 더미 데이터를 임시 배열에 만들어서, 전달. props 테스트
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: "더미 데이터 요소 1번입니다.",
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: "더미 데이터 요소 2번입니다.",
  //     checked: false,
  //   },
  //   {
  //     id: 3,
  //     text: "더미 데이터 요소 3번입니다.",
  //     checked: true,
  //   },
  // ]);

  //추가로 입력이 되는 todo 부분의 아이디를 id : 4부터 할당 할 예정.
  // const nextId = useRef(4);

  // 3000개 더미 데이터라서, 다음 번호
  const nextId = useRef(20001);

  // TodoMain -> TodoInsert 자식 컴포넌트에게, props로 함수를 전달하기.
  // onInsert 라는 함수는, onChange 함수와는 다르게,
  // 매번 새로운 함수를 생성함. 이유는 함수 안에 배열이 변경이 되어서,
  // todos 배열의 변경에 따라서 , 동작하게 만들기.


  // 방법1) useCallback에서 , 세터 함수 (값 형태x => 함수형태)
  //    추가로, 의존성 배열 모양을 빈배열 [] , 함수 생성을 1회만 했다는점.


// 방법2) 성능상 큰 차이 없고, 규모가 커지고, 산태를 관리해주는 라이브러리 Redux사용하게 되면 
// useReduce를 이용하게

// 방법2 - 순서1) useReduce import
// import { useReducer } from "react";
// 준비물, 1)리듀서 함수, 2) useReducer생성 3)dispatch 함수 호출.


// 페이징, 항번에 데이터 전부를 불러오는게 아니라, 눈에 보이는 정도의 크기만 불러옵니다
// 예) 20000개 데이터 다 불러오고있음 
// 하지만, 실제로 스크롤을 내리지 않는 이상, 한번에 전체 데이터를 다 볼수 없음 
// 결론, 일부분만 봄, 9개 만 보고 19991개의 불필요한 데이터 트래픽을 줄인다.
// 준비물)
// 1)모듈 설치하기
// yarn add react-virtualized 설치
// 2) 각 아이템 요소의 높이를 구해야함. 첫 번째 요소 말고, 두번째 요소부터의 높이구하기
// 왜냐하면 ? 첫번째 항목은 테두리가 없어서





// 2-1-1) 리듀서 함수 
const todoReducer = (todos,action) => {
  switch (action.type) {
    case "INSERT":
      return todos.concat(action.todo);
      case "REMOVE":
        return todos.filter((todo) => todo.id!== action.id);
      case "TOGGLE":
        return todos.map((todo) => todo.id === action.id? 
        {...todo, checked:!todo.checked } : todo
        );
        default:
          return todos;
  }
}


// 2-1-2) useReducer 생성 -> 기존 더미 데이터 만드는 부분 주석
const [todos, dispatch] = useReducer(todoReducer, undefined,createBulkTodos);
  const onInsert = useCallback(
    (text) => {
      const todo = {
        //  const nextId = useRef(4); 4부터 할당.
        id: nextId.current,
        text,
        checked: false,
      };
      // 성능 개선 2번째,
      // setTodos(todos.concat(todo));
      // 차이점: useCallback은 의존성 배열의 값이 변경 될때 마다, 새로 함수를 생성하던 것
      // 기존의 값을 변경하는 것 -> 함수 형태로 변경
      // 매번 새롭게 함수를 생성할 필요없음 
      // setTodos((todos) => todos.concat(todo));



      // 2-1-3)dispatch 함수 호출.
      dispatch({type: "INSERT",todo}, []);

      nextId.current += 1;
    },
    // 성능 개선 2번째, 의존성 배열 비우기
    // [todos]
    []
  );

  // 토글(스위치, on/off), checkbox 부분에, 이벤트 핸들러 추가하기
  // onToggle 이라는 이름, 함수 자식 컴포넌트에 전달하기 
  const onToggle = useCallback(
    id => {
        // setTodos(
        // 선택된 todo의 id가 일치하면, 기존 배열을 복사해서, 선택된 id의 속서 checked 부분을 변경
         // todos.map((todo) =>
        //   todo.id === id ? { ...todo, checked: !todo.checked } : todo
        // 성능 개선 2번째, 값이 아니라, 함수형태로 변경.
        // (todos) =>
        //   todos.map((todo) =>
        //     todo.id === id ? { ...todo, checked: !todo.checked } : todo
        //   )
        // );
      // 2-1-3) dispatch 함수를 호출.
      dispatch({ type: "TOGGLE", id });
    },
    // [todos]
    // 성능개선 2번째, 의존성 배열 없애기.
    []
  );

  // 지우기 기능 함수 추가하기
  // 데이터 추가시: 내장함수 , concat 이용해서, 새로운 배열 생성
  // 데이터 삭제시: 내장함수 , filter 이용해서, 새로운 배열 생성
  // 콜백함수 조건이 일치하는 요소만 뽑아서 배열 새로 생성

  const onRemove = useCallback(
    id => {
      // 만약, id가 2를 선택했다면, todo.id !== id,
      // 선택된 id 2를 제외하고 새로운 배열 생성
      // 결론, 선택된 2를 제거하는 효과

      // 성능 개선 2번째, 함수 형태로 변경하고, 의존성 배열에서 , todos 참조 안하기
      // 결론, 새롭게 매번 함수 생성을 안함
      // setTodos(todos.filter(todo => todo.id!== id))
      // setTodos((todos) => todos.filter(todo => todo.id!== id))

      // 2-1-3) dispatch 함수를 호출.
      dispatch({ type: "REMOVE", id });
    },
    // 성능 개선 2번째,
    // [todos]
    []
  )

  return (
    <MainCss>
      <TodoBase>
        {/* 위에서 만든 useCallback 함수를 자식 컴포넌트에게 전달하기. */}
        <TodoInsert onInsert={onInsert} />
        {/* 위에서 만든 임시 데이터 배열를 전달 : props 속성으로 전달 */}
        {/* 제거하는 함수를 props이용해서 전달 */}
        {/* 체크하는 함수를 props이용해서 전달 */}
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoBase>
    </MainCss>
  );
};

export default TodoMain;