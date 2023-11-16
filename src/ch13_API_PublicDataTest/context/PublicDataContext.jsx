import { createContext, useContext, useState } from 'react';

const PublicDataContext = createContext();

export const usePublicDataContext = () => {
  const context = useContext(PublicDataContext);
  if (!context) {
    throw new Error('usePublicDataContext는 PublicDataProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export const PublicDataProvider = ({ children }) => {
  const [category, setCategory] = useState('all');

  const handleSetCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const value = {
    state: {
      category,
    },
    actions: {
      setCategory: handleSetCategory,
    },
  };

  return <PublicDataContext.Provider value={value}>{children}</PublicDataContext.Provider>;
};
