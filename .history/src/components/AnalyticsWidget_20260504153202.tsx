const AnalyticsWidget = ({ analytics }: any) => {
    if (!analytics) return null;
    

    return (
        <div className="module-glass">
            <h3 className="panel-title">ANALYTICS_OVERVIEW</h3>

            <div className="stats-grid">

                <div className="stat-box">
                    <h4>Total Users</h4>
                    <p>{analytics.totalUsers}</p>
                </div>

                <div className="stat-box">
                    <h4>Total Capsules</h4>
                    <p>{analytics.totalCapsules}</p>
                </div>

                <div className="stat-box">
                    <h4>This Month Capsules</h4>
                    <p>{analytics.capsulesThisMonth}</p>
                </div>

                <div className="stat-box">
                    <h4>Storage Usage</h4>
                    <p>{analytics.storageMB} MB</p>
                </div>

            </div>
        </div>
    );
};

export default AnalyticsWidget;