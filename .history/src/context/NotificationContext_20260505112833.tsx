import { createContext, useContext, useEffect, useState,type ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// 🔹 Notification type
type Notification = {
  type: string;
  message: string;
};

// 🔹 Context type
type NotificationContextType = {
  notifications: Notification[];
};

// 🔹 Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// 🔹 Provider props type
type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("No userId → socket not connected");
      return;
    }

    // 🔥 IMPORTANT: correct port
    const socket: Socket = io("http://localhost:3000", {
      query: { userId },
    });

    const handler = (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    };

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("new-notification", handler);

    return () => {
      socket.off("new-notification", handler);
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// 🔹 Custom hook (stable export)
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
};