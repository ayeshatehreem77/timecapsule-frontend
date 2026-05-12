import { useEffect, useState } from "react";
import api from "../utils/api";

type Capsule = {
    _id: string;
    title: string;
    createdAt: string;

    deliveryStatus: string;
    isDeleted: boolean;
    isSealed: boolean;
    isOpened: boolean;

    recipientEmail?: string;
    unlockDate?: string;
};

const CapsulesManager = () => {

    const [capsules, setCapsules] = useState<Capsule[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [showDeleted, setShowDeleted] = useState(false);

    // ---------------- FETCH ----------------
    const fetchCapsules = async () => {
        try {
            const res = await api.get(
                `/admin/capsules?page=${page}&limit=10&search=${search}&deliveryStatus=${status}`
            );

            const activeCapsules = showDeleted
                ? res.data.capsules.filter((c: Capsule) => c.isDeleted)
                : res.data.capsules.filter((c: Capsule) => !c.isDeleted);

            setCapsules(activeCapsules);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCapsules();
    }, [page, search, status, showDeleted]);

    // ---------------- DELETE (soft delete already backend handles it) ----------------
    const deleteCapsule = async (id: string) => {
        try {
            await api.delete(`/admin/capsules/${id}`);
            fetchCapsules();
        } catch (err) {
            console.error(err);
        }
    };

    // ---------------- UNLOCK ----------------
    // const unlockCapsule = async (id: string) => {
    //     try {
    //         await api.patch(`/admin/capsules/${id}/status`, {
    //             isSealed: false,
    //         });

    //         fetchCapsules();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    // ---------------- UI STATUS ----------------
    const getStatus = (c: Capsule) => {
        if (c.isDeleted) return "DELETED";
        if (c.isSealed) return "LOCKED";
        return "UNLOCKED";
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

                <select
                    className="cyber-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                </select>

                <label className="cyber-toggle">
                    <input
                        type="checkbox"
                        checked={showDeleted}
                        onChange={() => setShowDeleted(!showDeleted)}
                    />
                    Show Deleted Capsules
                </label>
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

                            <td>{getStatus(c)}</td>

                            <td>
                                {new Date(c.createdAt).toLocaleDateString()}
                            </td>

                            <td>

                                {/* Delete */}
                                <button
                                    className="btn-neon-red"
                                    onClick={() => deleteCapsule(c._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
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