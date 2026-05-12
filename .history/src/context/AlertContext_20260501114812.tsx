import React, { createContext, useContext, useState, type ReactNode } from 'react';

// 1. Context Interface
interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error') => void;
}

// 2. Create Context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// 3. Provider Component (Named Export)
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

  const showAlert = (message: string, type: 'success' | 'error') => {
    // Aapka alert logic yahan aayega
    console.log(`${type}: ${message}`);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// 4. Hook (Named Export) - Don't use 'export default' here
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};