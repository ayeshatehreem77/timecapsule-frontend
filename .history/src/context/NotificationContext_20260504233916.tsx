import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

type Notification = {
    type: string;
    message: string;
};

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        const newSocket = io("http://localhost:5000", {
            query: { userId },
        });

        setSocket(newSocket);

        newSocket.on("new-notification", (data: Notification) => {
            setNotifications((prev: Notification[]) => [data, ...prev]);
        });

        return () => {
            socket.off("new-log");
            socket.disconnect(); // ✅ CLEANUP FUNCTION
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);