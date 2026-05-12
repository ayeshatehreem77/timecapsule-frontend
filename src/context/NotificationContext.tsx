import { createContext } from "react";

export type Notification = {
  type: string;
  message: string;
};

export type NotificationContextType = {
  notifications: Notification[];
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);