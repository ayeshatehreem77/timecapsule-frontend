import { useEffect, useState } from "react";
import api from "../utils/api";

const CapsulesManager = () => {
    type Capsule = {
        _id: string;
        title: string;
        status: string;
        createdAt: string;
    };
    const [capsules, setCapsules] = useState<Capsule[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");


    const fetchCapsules = async () => {
        try {
            const res = await api.get(`/admin/capsules?page=${page}&limit=10&search=${search}&status=${status}`)

            setCapsules(res.data.capsules);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCapsules();
    }, [page, search, status]);

    const deleteCapsule = async (id: string) => {
        await api.delete(`/admin/capsules/${id}`);
        fetchCapsules(); // 🔥 IMPORTANT
    };

    const updateStatus = async (id: string, newStatus: string) => {
        await api.patch(`/admin/capsules/${id}/status`, {
            status: newStatus,
        });

        fetchCapsules(); // 🔥 IMPORTANT
    };

    return (
        <div className="module-glass">
            <h3 className="panel-title">CAPSULES_MANAGER</h3>

            {/* Filters */}
            <div className="filters">
                <input
                    className="cyber-input"
                    placeholder="Search capsule..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select className="cyber-select" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="locked">Locked</option>
                    <option value="unlocked">Unlocked</option>
                    <option value="scheduled">Scheduled</option>
                </select>
            </div>

            {/* Table */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {capsules.map((c) => (
                        <tr key={c._id}>
                            <td>{c.title}</td>
                            <td>{c.status}</td>
                            <td>{new Date(c.createdAt).toLocaleDateString()}</td>

                            <td>
                                <button className="btn-neon-blue" onClick={() => updateStatus(c._id, "unlocked")}>
                                    Unlock
                                </button>

                                <button className="btn-neon-red" onClick={() => deleteCapsule(c._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Prev
                </button>

                <span>Page {page}</span>

                <button
                    disabled={page * 10 >= total}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CapsulesManager;