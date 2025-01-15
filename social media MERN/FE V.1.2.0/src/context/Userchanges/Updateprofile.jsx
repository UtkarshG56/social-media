import React, { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({}); 
  const [isEditing, setIsEditing] = useState(false); 

  const handleUpdateProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      
      await axios.put(`http://localhost:8800/api/user/${userId._id}`, updatedUser);
      setIsEditing(false);
      
      fetchUser();
    } catch (error) {
      console.error("Error updating profile:", error);
      
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            {/* ... Other profile content ... */}
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedUser.Username}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, Username: e.target.value })
                    }
                  />
                ) : (
                  user.Username
                )}
              </h4>
              <span className="profileInfoDesc">{user.desc}</span>
              {isEditing ? (
                <div>
                  <button onClick={handleSaveProfile}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={handleUpdateProfile}>Update Profile</button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed Username={"null"} />
          </div>
        </div>
      </div>
    </>
  );
}
