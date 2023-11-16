// 모델 구조 :
// key : article, 값 : [{},{},{},{},{},{},{},{}....]
// 가지고 올 데이터:
// 1)title, 2)description, 3)url, 4)urlToImage
import React from "react";
import styled from "styled-components";
// css 작업대상,
// 1) 이미지, 2) 콘텐츠 내용
const NewsItemCss = styled.div`
  display: flex;
  font-family: "Nanum Gothic", sans-serif;
  border-top: 0.5px solid black;
  
  /* border: 0.5px solid black; */

  // 이미지, thumbnail
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 170px;
      height: 130px;
      // 해당사이즈에 비율에 맞게 이미지 크기 조정
      object-fit: cover;
      font-family: "Nanum Gothic", sans-serif;
      border-top: 0.5px solid black;
    }
  }

  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
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
  & + & {
    margin-top: 3rem;
  }
`;

// 자식 컴포이고 부모 컴포로 부터 , 데이터 받아와서
// 받은 데이터를 출력하는 형태.
const NewsItem = ({ article }) => {
  // article: 각 기사의 내용을 담은 객체
  // 비구조화 할당으로 각 각 할당
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemCss>
      {/* 조건부 렌더링으로 출력 */}

      {urlToImage && (
        <div className="thumbnail">
          {/* 링크 클릭시 , target="blank": 새창으로 열기
          rel="noopener noreferrer" : 새창으로 열었을때,
          원본 링크의 참조라든지, 개인 정보 부분 막아줌 */}
          <a href={url} target="blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemCss>
  );
};

export default NewsItem;
