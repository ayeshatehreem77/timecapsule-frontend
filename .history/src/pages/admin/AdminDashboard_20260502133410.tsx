import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/adminDashboard.css";
import QuickStats from '../../components/QuickStats';
import SubjectList from '../../components/SubjectList';
import { useNavigate } from 'react-router-dom';
// ... baki imports

const AdminDashboard = () => {
    const [data, setData] = useState({ stats: null, users: [] });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Data fetching logic ko aik function mein rakhein
    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [statsRes, usersRes] = await Promise.all([
                axios.get('http://localhost:5000/admin/stats', config),
                axios.get('http://localhost:5000/admin/users', config)
            ]);

            setData({ stats: statsRes.data, users: usersRes.data });
        } catch (err) {
            console.error("Access Denied or Server Error");
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    if (loading) return <div className="loader">DECRYPTING ADMIN ACCESS...</div>;

    return (
        <div className="admin-dashboard-container">
            <header className="admin-header">
                <h1 className="neon-text">ADMIN COMMAND CENTER 2.0</h1>
            </header>

            <div className="admin-grid">
                <div className="stats-module">
                    <QuickStats stats={data.stats} />
                </div>

                <div className="subject-module">
                    {/* 2. refreshData prop yahan pass karein */}
                    <SubjectList users={data.users} refreshData={fetchAdminData} />
                </div>
            </div>
            <div className="sidebar-footer">
                <button className="nav-logout-btn" onClick={handleLogout}>
                    <span className="logout-icon">⏻</span>
                    <span className="logout-text">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;