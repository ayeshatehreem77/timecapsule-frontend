import { useEffect, useState } from 'react';
import api from '../utils/api'
import { io } from "socket.io-client";


const EventLog = () => {
    type Log = {
        _id: string;
        message: string;
        level: string;
        userId: string;
        createdAt: string;
    };
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get('/admin/logs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLogs(Array.isArray(res.data.logs) ? res.data.logs : []);
            } catch (err) {
                console.error("LOG_FETCH_FAILURE");
            }
        };
        fetchLogs();


    }, []);

    useEffect(() => {
        const socket = io("http://localhost:5000");

        socket.on("new-log", (log: Log) => {
            setLogs(prev => [log, ...prev]);
        });

        return () => {
            socket.disconnect(); // ✅ CLEANUP FUNCTION
        };
    }, []);

    return (
        <div className="module-glass log-container">
            <h3 className="panel-title">SYSTEM_EVENT_LOGS</h3>
            <div className="terminal-window">
                {logs.map((log: any, index) => (
                    <div key={index} className="log-entry">
                        <span className="log-timestamp">[{new Date(log.createdAt).toLocaleTimeString()}]</span>
                        <span className={`log-type ${log.level}`}> {log.level.toUpperCase()} </span>
                        <span className="log-msg">{log.message}</span>
                        <span className="log-user"> - ID: {log.userId}</span>
                    </div>
                ))}
                {logs.length === 0 && <div className="log-msg">Scanning for neural activities...</div>}
            </div>
        </div>
    );
};

export default EventLog;