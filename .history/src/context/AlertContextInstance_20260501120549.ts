import { createContext } from 'react';

export type AlertType = 'success' | 'error' | 'info' | null;

export interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);