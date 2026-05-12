import { useEffect, useState,type ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { NotificationContext,type Notification } from "./NotificationContext";

type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    console.log("👤 USER ID:", userId); // 🔥 ADD THIS

    const newSocket = io("http://localhost:5000", {
        query: { userId },
    });

    newSocket.on("connect", () => {
        console.log("🟢 SOCKET CONNECTED");
    });

    newSocket.on("new-notification", (data) => {
        console.log("🔔 RECEIVED:", data); // 🔥 IMPORTANT
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