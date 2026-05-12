import React, { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info' | null;

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

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
      
      {alert.type && (
        <div className={`cyber-alert-container alert-${alert.type}`}>
          <div className="alert-content">
            <div className="alert-icon">
              {alert.type === 'success' ? '✓' : alert.type === 'error' ? '✕' : 'ℹ'}
            </div>
            <div className="alert-text">
              <span className="alert-status-label">{alert.type.toUpperCase()}</span>
              <p>{alert.message}</p>
            </div>
          </div>
          <div className="alert-progress-bar"></div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};