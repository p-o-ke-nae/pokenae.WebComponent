'use client';

import React, { createContext, useContext } from 'react';

export const PageModes = {
  EDIT: 'edit',
  READ_ONLY: 'read-only',
  // 将来的に追加するモード
};

const PageModeContext = createContext(PageModes.READ_ONLY);

export const PageModeProvider = ({ value, children }) => {
  return (
    <PageModeContext.Provider value={value}>
      {children}
    </PageModeContext.Provider>
  );
};

export const usePageMode = () => {
  return useContext(PageModeContext);
};
