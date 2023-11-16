// 방금 만든 css 문법을 테스트할 빈 도화지

// CSS Module 테스트 하기
// 만든 CSSModule.module.css 불러오기
import cssmodule from "./CSSModule.module.css";

import React from "react";
import "./SassComponent.scss";

const TestSass = () => {
  console.log("css module 확인 : " + cssmodule);
  return (
    <>
      {/* CSS Module 테스트 하기 -> 적용 */}
      <div className={cssmodule.wrapper}>CSS Module 테스트 하기</div>
      <div className="testGlobal">CSS Module testGlobal 테스트 하기2</div>
      {/* 크롬 개발자 도구에서, 해당 태그명을 확인하면 됨. */}
      {/* CSSModule_wrapper__Qu8Rv CSSModule_wrapper2__DGrni */}
      {/* '' : 작은 따옴표, " " : 큰 따옴표, `` : 백틱 */}
      <div className={`${cssmodule.wrapper} ${cssmodule.wrapper2}`}>
        CSS Module 테스트 하기 2개의 클래스 적용해보기
      </div>
      <div className="SassTest">
        <div className="box red" />
        <div className="box blue" />
        <div className="box green" />
      </div>
    </>
  );
};

export default TestSass;
