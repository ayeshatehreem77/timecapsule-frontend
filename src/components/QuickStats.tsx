const QuickStats = ({ stats }: { stats: any }) => {
  return (
    <div className="stats-container">
      <div className="stat-tile">
        <span>TOTAL SUBJECTS</span>
        <h2>{stats?.totalUsers || 0}</h2>
      </div>
      <div className="stat-tile neon-magenta">
        <span>ACTIVE CAPSULES</span>
        <h2>{stats?.totalCapsules || 0}</h2>
      </div>
      <div className="stat-tile neon-red">
        <span>DELETED DATA</span>
        <h2>{stats?.deletedCapsules || 0}</h2>
      </div>
    </div>
  );
};

export default QuickStats;