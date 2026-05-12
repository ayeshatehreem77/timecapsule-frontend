import { useState, useEffect } from 'react';


const SystemHealth = () => {
    // Demo data, aap isay backend endpoint se connect kar sakti hain
    const [health, setHealth] = useState({
        cpu: 42,
        ram: 68,
        latency: "12ms",
        uptime: "144h 12m"
    });

    return (
        <div className="module-glass health-container">
            <h3 className="panel-title">CORE_SYSTEM_HEALTH</h3>
            <div className="health-grid">
                <div className="health-stat">
                    <p>CPU_LOAD</p>
                    <div className="progress-bar">
                        <div className="progress-fill neon-cyan" style={{ width: `${health.cpu}%` }}></div>
                    </div>
                    <span>{health.cpu}%</span>
                </div>

                <div className="health-stat">
                    <p>MEMORY_SYNC</p>
                    <div className="progress-bar">
                        <div className="progress-fill neon-magenta" style={{ width: `${health.ram}%` }}></div>
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