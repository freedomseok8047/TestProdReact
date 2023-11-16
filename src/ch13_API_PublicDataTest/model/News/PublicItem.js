// 부산 테마 먹거리 요소로 구성
// 기존 css 재사용
// 가져올 데이터 부분 변경
import React from 'react';
import styled from 'styled-components';
// css 작업대상,
// 1) 이미지, 2) 콘텐츠 내용
const NewsItemCss = styled.div`
  display: flex;
  font-family: 'Nanum Gothic', sans-serif;
  /* border: 0.5px solid black; */

  // 이미지, thumbnail
  .thumbnail {
    margin-right: 1rem;
    img{
      display: block;
      width: 170px;
      height: 130px;
      // 해당사이즈에 비율에 맞게 이미지 크기 조정
      object-fit: cover;
    }
  }

  .contents {
    h2 {
      margin: 0;
      a{
        color: blue;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      //텍스트나 내용이 일반저긴 공백과 줄바꿈 규칙을 따름 
      // 브라우저 넓이에 따라 자동으로 줄바꿈
      white-space: normal;
    }
  }

  // &: 현재요소
  // &+&: 형제 연산자, 요소의 이웃, 같은 요소 나열시 
  //
  &+& {
    margin-top: 3rem;
  }

`;


const PublicItem = ({article}) => {
 // article: 각 기사의 내용을 담은 객체
  // 비구조화 할당으로 각 각 할당
  // 선택할 요소: 1)MAIN_TITLE, 2)CNTCT_TEL 3)MAIN_IMG_THUMB 4)ADDR1
  const { MAIN_TITLE, CNTCT_TEL, MAIN_IMG_THUMB, ADDR1 } = article
  return (
    <NewsItemCss>
      {/* 조건부 렌더링으로 출력 
      썸네일 사진 있으면 렌더링,
       없으면 null*/}

      {
        MAIN_IMG_THUMB && (<div className="thumbnail">
          {/* 링크 클릭시 , target="blank": 새창으로 열기
          rel="noopener noreferrer" : 새창으로 열었을때,
          원본 링크의 참조라든지, 개인 정보 부분 막아줌 */}
            <img src={MAIN_IMG_THUMB} alt="thumbnail" />
            
          </div>
        )
      }
      <div className="contents">
        <h2>
            {MAIN_TITLE}
        </h2>
        <p>주소: {CNTCT_TEL}</p>
        <p>연락처: {ADDR1}</p>
      </div>
      
    </NewsItemCss>
  );
};

export default PublicItem;