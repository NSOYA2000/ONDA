import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [file, setFile] = useState(null); // The actual File object
  const [targetFormat, setTargetFormat] = useState(null);

  const reset = useCallback(() => {
    setFile(null);
    setTargetFormat(null);
  }, []);

  return (
    <AppContext.Provider value={{ file, setFile, targetFormat, setTargetFormat, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
