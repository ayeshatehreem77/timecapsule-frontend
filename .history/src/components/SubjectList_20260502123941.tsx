import React from 'react';
import axios from 'axios';
import { useAlert } from '../context/useAlert'

const SubjectList = ({ users, refreshData }: { users: any[], refreshData: Function }) => {
  const { showAlert } = useAlert();

  const toggleBlockStatus = async (id: string, currentlyBlocked: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const action = currentlyBlocked ? 'unblock' : 'block';
      
      // 🚀 NestJS Backend Call
      await axios.patch(`http://localhost:5000/admin/users/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      showAlert(`User successfully ${action}ed!`, 'success');
      refreshData(); // Data dubara fetch karein taake UI update ho jaye
    } catch (err) {
      showAlert("Failed to update user status", "error");
    }
  };

  return (
    <div className="user-list-module module-glass">
      <h3 className="panel-title">SUBJECT DIRECTORY</h3>
      <div className="subject-grid">
        {users.map((user) => (
          <div key={user._id} className={`subject-card ${user.isBlocked ? 'is-blocked' : ''}`}>
            <div className="user-info">
              <img src={user.profilePic} alt="avatar" className="admin-avatar" />
              <div>
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
            
            <div className="admin-actions">
              <button 
                onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                className={`btn-cyber ${user.isBlocked ? 'btn-unblock' : 'btn-block'}`}
              >
                {user.isBlocked ? 'REVIVE ACCESS' : 'TERMINATE ACCESS'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;