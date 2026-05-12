import { useState, useEffect } from 'react';
import api from '../utils/api'; // axios instance

const SystemHealth = () => {

    const [health, setHealth] = useState({
        cpu: 0,
        ram: 0,
        latency: "0ms",
        uptime: "0h 0m"
    });

    const fetchHealth = async () => {
        try {
            const res = await api.get('/admin/system-health');
            setHealth(res.data);
        } catch (err) {
            console.error("Failed to fetch system health", err);
        }
    };

    useEffect(() => {
        fetchHealth();

        // 🔁 auto refresh every 5 sec
        const interval = setInterval(fetchHealth, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="module-glass health-container">
            <h3 className="panel-title">SYSTEM_HEALTH</h3>

            <div className="health-grid">
                <div className="health-stat">
                    <p>CPU_LOAD</p>
                    <div className="progress-bar">
                        <div
                            className="progress-fill neon-cyan"
                            style={{ width: `${health.cpu}%` }}
                        ></div>
                    </div>
                    <span>{health.cpu}%</span>
                </div>

                <div className="health-stat">
                    <p>MEMORY_SYNC</p>
                    <div className="progress-bar">
                        <div
                            className="progress-fill neon-magenta"
                            style={{ width: `${health.ram}%` }}
                        ></div>
                    </div>
                    <span>{health.ram}%</span>
                </div>

                <div className="health-info-row">
                    <div className="info-box">
                        <small>LATENCY</small>
                        <p className="neon-text-small">{health.latency}</p>
                    </div>

                    <div className="info-box">
                        <small>UPTIME</small>
                        <p className="neon-text-small">{health.uptime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemHealth;