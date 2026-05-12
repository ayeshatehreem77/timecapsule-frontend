import { useEffect, useState } from 'react';
import api from "../../utils/api";;
import "../../styles/adminDashboard.css";
import QuickStats from '../../components/QuickStats';
import SubjectList from '../../components/SubjectList';
import { useNavigate } from 'react-router-dom';
import SystemHealth from '../../components/SystemHealth';
import EventLog from '../../components/EventLog';
import CapsulesManager from '../../components/CapsulesManager';
import { useAlert } from '../../context/useAlert';



const AdminDashboard = () => {

    type Stats = {
        totalUsers: number;
        totalCapsules: number;
        deletedCapsules: number;
    };

    type User = {
        _id: string;
        email: string;
        isBlocked: boolean;
    };

    type AdminData = {
        stats: Stats | null;
        users: User[];
    };

    const [data, setData] = useState<AdminData>({
        stats: null,
        users: [],
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [statsRes, usersRes] = await Promise.all([
                api.get('/admin/stats', config),
                api.get('/admin/users', config)
            ]);

            setData({
                stats: statsRes.data,
                users: usersRes.data.users ?? usersRes.data,
            });
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

    const handleSwitchUser = () => {
        console.log("before switch user:", localStorage.getItem("user"));
        console.log("token:", localStorage.getItem("token"));
        navigate("/dashboard", { replace: true });
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
                <div className="full-width">
                    <QuickStats stats={data.stats} />
                </div>

                <div className="module-row">
                    
                    <div className="module-column-6">
                        <EventLog />
                    </div>
                    <div className="module-column-4">
                        <SystemHealth />
                    </div>
                </div>
                <div className="full-width">
                    <CapsulesManager />
                </div>

                <div className="full-width">
                    <SubjectList users={data.users} refreshData={fetchAdminData} />
                </div>

                <div className="sidebar-footer d-flex gap-3">
                    <button className="nav-logout-btn" onClick={handleLogout}>
                        <span className="logout-icon">⏻</span>
                        <span className="logout-text">Logout</span>
                    </button>
                    <button className="nav-switch-btn" onClick={handleSwitchUser}>
                        <span className="logout-text">Switch to User</span>
                    </button>
                </div>
                <div className="sidebar-footer">
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;