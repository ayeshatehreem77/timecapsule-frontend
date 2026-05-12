import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

type Notification = {
  type: string;
  message: string;
};

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // ❗ safety
    if (!userId) {
      console.warn("No userId found → socket not connected");
      return;
    }

    const socket = io("http://localhost:5000", {
      query: { userId },
    });

    // 🔥 debug (optional)
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    const handler = (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    };

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

export const useNotifications = () => useContext(NotificationContext);