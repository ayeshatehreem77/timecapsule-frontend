import React, { createContext, useContext, useState, type ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info' | null;

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// --- Alert ki UI ko alag function mein nikal diya ---
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

// --- Main Provider Component ---
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

// --- Hook Export ---
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};

// Vite ko khush karne ke liye default export add kiya
export default AlertProvider;