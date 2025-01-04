import React, { useState, useEffect } from 'react';
import './Profile.css'; // CSS File for styling

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', mobile: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', mobile: '' });
  const [isLoading, setIsLoading] = useState(true); // To show loading state

  useEffect(() => {
    // Fetch user data from the backend
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage
      const response = await fetch('http://localhost:3000/api/profile', {
        headers: {
          'Authorization': token,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUser(data);
      setEditedUser(data); // Set initial data for editing
      setIsLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Include token in the headers for authentication
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setUser(editedUser);
        setIsEditing(false);
      } else {
        alert('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-info">
        <div className="profile-field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Mobile:</label>
          {isEditing ? (
            <input
              type="text"
              name="mobile"
              value={editedUser.mobile}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <span>{user.mobile}</span>
          )}
        </div>

        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
