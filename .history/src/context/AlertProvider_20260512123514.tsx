import { useState, type ReactNode } from 'react';
import { AlertContext, type AlertType } from './AlertContextInstance';
import "../styles/alert.css"

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
            {/* Icon Section */}
            <div className="alert-icon">
              {alert.type === 'success' ? '✓' : alert.type === 'error' ? '✕' : 'ℹ'}
            </div>

            {/* Text Section */}
            <div className="alert-text">
              <span className="alert-status-label">
                {alert.type === 'success' ? 'SYSTEM READY' : alert.type === 'error' ? 'SYSTEM ERROR' : 'SYSTEM INFO'}
              </span>
              <p>{alert.message}</p>
            </div>
          </div>

          {/* Bottom Animated Progress Bar */}
          <div className="alert-progress-bar"></div>

          {/* Background Glow Effect (Optional for extra styling) */}
          <div className="alert-glow-overlay"></div>
        </div>
      )}
    </AlertContext.Provider>
  );
};