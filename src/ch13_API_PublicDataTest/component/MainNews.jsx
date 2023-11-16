import React from 'react';
import NewsList from './NewsList';
import Categories from './Categories';
import { useState,useCallback } from 'react';

const MainNews = () => {
  // 뉴스 메인에서 , 카테고리 값을 state 관리, props 로 전달해서 , 이벤트 핸들러 추가
  const [category, setCategory] = useState("all");
  const onSelect = useCallback((category) =>{
    setCategory(category);
  },[])

  return (
    <div>
      <Categories category={category} onSelect={onSelect}/>
      <NewsList category={category}/>
    </div>
  );
};

export default MainNews;