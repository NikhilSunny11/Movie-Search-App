import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import './Profile.css';

export default function Profile() {
  const { username, customLists, updateUsername, addCustomList, removeCustomList } = useProfile();
  
  const [localUsername, setLocalUsername] = useState(username);
  const [newListName, setNewListName] = useState('');

  const handleSaveUsername = (e) => {
    e.preventDefault();
    updateUsername(localUsername);
  };

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      addCustomList(newListName);
      setNewListName('');
    }
  };

  return (
    <div className="profile-page container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Manage your identity and custom movie lists.</p>
      </div>

      <div className="profile-card glass">
        <h3>Profile Details</h3>
        <form onSubmit={handleSaveUsername} className="profile-form">
          <div className="profile-input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={localUsername} 
              onChange={e => setLocalUsername(e.target.value)}
              placeholder="e.g., MovieBuff99"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={localUsername === username}>
            Save Changes
          </button>
        </form>
      </div>

      <div className="profile-card glass">
        <h3>Custom Lists</h3>
        <p className="profile-card-desc">Create custom lists like "Favorites", "Family Movies", etc., and they will appear in the "+ Add to List" dropdown.</p>
        
        <form onSubmit={handleAddList} className="profile-form list-form">
          <div className="profile-input-group">
            <input 
              type="text" 
              value={newListName} 
              onChange={e => setNewListName(e.target.value)}
              placeholder="New list name..."
            />
          </div>
          <button type="submit" className="btn btn-secondary" disabled={!newListName.trim()}>
            Add List
          </button>
        </form>

        {customLists.length > 0 ? (
          <ul className="custom-lists-container">
            {customLists.map(list => (
              <li key={list} className="custom-list-item">
                <span>{list}</span>
                <button 
                  onClick={() => removeCustomList(list)} 
                  className="remove-list-btn"
                  title={`Remove ${list}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-custom-lists">You haven't created any custom lists yet.</p>
        )}
      </div>
    </div>
  );
}
