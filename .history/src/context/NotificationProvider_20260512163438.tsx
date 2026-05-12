import { useEffect, useState, type ReactNode } from "react";
import { io } from "socket.io-client";
import { NotificationContext, type Notification } from "./NotificationContext";

type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // 🔥 IMPORTANT FIX
    if (!userId) return;

    const newSocket = io(import.meta.env.VITE_API_URL, {
      query: { userId },
    });

    newSocket.on("connect", () => {
      console.log("🟢 SOCKET CONNECTED");
    });

    newSocket.on("new-notification", (data) => {
      console.log("🔔 RECEIVED:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};