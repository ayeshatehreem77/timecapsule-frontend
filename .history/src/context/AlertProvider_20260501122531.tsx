import React, { useState,type ReactNode } from 'react';
import { AlertContext,type AlertType } from './AlertContextInstance';
import "../styles/alert.css"

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{ message: string; type: AlertType }>({
    message: 'ttestinggg',
    type: "success",
  });

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });
    // setTimeout(() => setAlert({ message: '', type: null }), 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.type && (
        <div className={`cyber-alert-container alert-${alert.type}`}>
           {/* Aapka alert ka HTML/Design yahan aayega */}
           <p>{alert.message}</p>
        </div>
      )}
    </AlertContext.Provider>
  );
};