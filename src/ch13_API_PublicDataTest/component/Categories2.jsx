import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

// 카테고리 목록, 보이는 건 한글, 값은 영어로 할당.
const categories = [
  { name: "busanFood", text: "부산테마먹거리" },
  { name: "busanWalking", text: "부산도보여행" },
  { name: "Trip_for_Autumn", text: "부산도보여행" },
];
// css
const CategoriesBlockCss = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  /* background-image: url("https://cdn.pixabay.com/animation/2022/07/30/22/01/22-01-29-66_512.gif");
  background-size: 10%; */
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

// 기존방식
// const CategoriesCss = styled.div`
//   font-size: 1.5rem;
//   cursor: pointer;
//   white-space: pre;
//   text-decoration: none;
//   color: inherit;
//   padding-bottom: 0.5rem;

//   &:hover {
//     color: red;
//   }

//   // active 클래스 속성 추가.
//   ${(props) =>
//     props.active &&
//     css`
//       font-weight: 600;
//       border-bottom: 2px solid violet;
//       color: aqua;
//       &:hover {
//         color: green;
//       }
//     `}

//   & + & {
//     margin-left: 1rem;
//   }
// `;

// NavLink 방식. 변경.
const CategoriesCss = styled(NavLink)`
  font-size: 1.5rem;
  font-family: "Caveat", cursive;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.5rem;

  &:hover {
    color: #120a0a;
  }

  // active 클래스 속성 추가.
  // 여기 부분 변경됨, NavLink 방식으로
  &.active {
    font-weight: 600;
    border-bottom: 2px solid black;
    color: darkblue;
    &:hover {
      color: darkgray;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;
{
  /* <Categories category={category} onSelect={onSelect} /> */
}
//기존 방식
// const Categories = ({ category, onSelect }) => {
//   return (
//     <CategoriesBlockCss>
//       {categories.map((c) => (
//         <CategoriesCss
//           key={c.name}
//           active={category === c.name}
//           onClick={() => onSelect(c.name)}
//         >
//           {c.text}
//         </CategoriesCss>
//       ))}
//     </CategoriesBlockCss>
//   );
// };

// NavLink 방식. 변경.
const Categories2 = ({ category, onSelect }) => {
  return (
    <CategoriesBlockCss>
      {categories.map((c) => (
        <CategoriesCss
          key={c.name}
          // NavLink 변경 부분
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={
            c.name === "all" ? "/newsPageTest/all" : `/newsPageTest/${c.name}`
          }
        >
          {c.text}
        </CategoriesCss>
      ))}
    </CategoriesBlockCss>
  );
};

export default Categories2;
