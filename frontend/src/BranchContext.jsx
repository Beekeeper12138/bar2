import React, { createContext, useContext, useState } from 'react';

const BranchContext = createContext();

export function BranchProvider({ children }) {
  const [branch, setBranch] = useState('张氏');
  return (
    <BranchContext.Provider value={{ branch, setBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  return useContext(BranchContext);
} 