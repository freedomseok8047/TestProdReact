// 입력 받는 기능ㅇ르 분리한 파일을
// 불러와서 테스트 할 환경
import React, { useState } from "react";
// 순서1 설정. 파일 분리한 기능을 불러오기
import useInfoInputFunc from "./InfoInputFunc.js";

const InfoTestCustomHooks9 = () => {
  // 순서2 설정. 불러와서 재사용하기
  // useInfoInputFunc의 반환 값은 2개
  // 1: state 상태 값, 2: 이벤트 핸들러 함수
  // 비구조화 할당 문법으로
  const [state, onChange] = useInfoInputFunc({ name: "", nickName: "" });
  const { name, nickName } = state;

  return (
    <div>
      <div>
        {/* 입력창인데, 값을 입력시, onChange 이벤트 핸들러 동작해서, 결과 뷰에 반영 */}
        <input name="name" value={name} onChange={onChange} />
        <input name="nickName" value={nickName} onChange={onChange} />
      </div>
      {/* 결과 뷰 출력 */}
      <div>
        <h1>
          이름:
          <b>{name}</b>
        </h1>
      </div>
      <div>
        <h1>
          닉네임:
          <b>{nickName}</b>
        </h1>
      </div>
    </div>
  );
};

export default InfoTestCustomHooks9;

// const [state, onChange] = useInfoInputFunc(
//   {name: "",
//    nickName: ""},
// );
//
//   밑의 함수를 위의 한줄로 대체 -> 밑에 함수는 InfoInputFunc에 따로 분리 정의
//
// const InfoTestUseState = () => {
//   // state 상태, useState('초깃값') -> 결과는 2개를 반환 1 name : state 상태값 2 setName : 세터 함수를
//   // 반환 -> 업데이트를 하는 함수 setName -> name 값을 업데이트 해줌
//   const [name, setName] = useState("");
//   const [nickName, setNickName] = useState("");

//   // 이벤트 핸들러 추가
//   // 1. 이름 캐멀케이스 표기법, 2. 인자로는 함수 형태로 전달
//   const onChangeName = (e) => {
//     setName(e.target.value);
//   };
//   const onChangeNickName = (e) => {
//     setNickName(e.target.value);
//   };
