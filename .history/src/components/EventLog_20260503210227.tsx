import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/adminDashboard.css"; 

const EventLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/admin/logs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLogs(res.data);
            } catch (err) {
                console.error("LOG_FETCH_FAILURE");
            }
        };
        fetchLogs();
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