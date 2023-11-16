import React, { createContext, useState } from 'react';
import Categories2 from './Categories2';
import PublicDataList from './PublicDataList';

const PublicDataContext = createContext({
  // state 속성으로 값으로
  state: { category: "all" },
  // actions 속성으로 함수로
  actions: {
    setCategory: () => {},
  },
});

const PublicDataProvider = ({ children }) => {
  const [category, setCategory] = useState("all");

  const handleSetCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const contextValue = {
    state: {
      category,
    },
    actions: {
      setCategory: handleSetCategory,
    },
  };

  return (
    <PublicDataContext.Provider value={contextValue}>
      {children}
    </PublicDataContext.Provider>
  );
};

const OnlyPublicDataMain = () => {
  return (
    <div>
      <PublicDataProvider>
        <Categories2 />
        <PublicDataList />
      </PublicDataProvider>
    </div>
  );
};

// ColorConsumer : 게터 , 이용하는 쪽 역할이 비슷
const { Consumer: PublicDataConsumer } = PublicDataContext;
// 추가
// ColorProvider: 세터, ColorConsumer: 게터
export { PublicDataProvider, PublicDataConsumer };
// 내보내기
export default OnlyPublicDataMain;
