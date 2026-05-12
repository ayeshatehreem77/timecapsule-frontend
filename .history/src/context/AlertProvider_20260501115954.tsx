// src/context/AlertContext.tsx
import React, { createContext, useState,type ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info' | null;

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

// Hum context ko export karenge taake hook wali file isay use kar sake
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

const CyberAlert = ({ message, type }: { message: string; type: AlertType }) => {
  if (!type) return null;
  return (
    <div className={`cyber-alert-container alert-${type}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </div>
        <div className="alert-text">
          <span className="alert-status-label">{type.toUpperCase()}</span>
          <p>{message}</p>
        </div>
      </div>
      <div className="alert-progress-bar"></div>
    </div>
  );
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{ message: string; type: AlertType }>({
    message: '',
    type: null,
  });

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: null }), 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CyberAlert message={alert.message} type={alert.type} />
    </AlertContext.Provider>
  );
};