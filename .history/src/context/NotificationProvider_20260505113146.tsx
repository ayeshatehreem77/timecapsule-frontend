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

    if (!userId) return;

    const socket: Socket = io("http://localhost:3000", {
      query: { userId },
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