// SuggestedUsers.js
import React, { useState, useEffect } from 'react';
import './Alluser.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function SuggestedUsers({location}) {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const {user, dispatch} = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/user/${user._id}`);
      
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
       } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser()
  }, [suggestedUsers]);
  useEffect(() => {
    fetch('http://localhost:8800/api/user')
      .then((response) => response.json())
      .then((data) => setSuggestedUsers(data))
      .catch((error) => console.error('Error fetching suggested users', error));
  }, []);

  const handleFollow = (followedUserId) => {
    fetch(`http://localhost:8800/api/user/${followedUserId}/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user._id }),
    })
      .then((response) => {
        if (response.status === 200) {
          let updatedSuggestedUsers = suggestedUsers.filter((user) => user._id !== followedUserId);
          setSuggestedUsers(updatedSuggestedUsers);
        } else {
          console.error('Failed to follow user');
        }
      })
      .catch((error) => console.error('Error following user', error));
  };

  return (
    <div>
      <h2>{"People You May Know"}</h2>
      <ul className="suggestname">
        {suggestedUsers.filter((item) => !user.following.includes(item._id)).map((user) => (
          <li className="suggestname1" key={user._id}>
            <span>{user.Username}</span>
            <button onClick={() => handleFollow(user._id)}>Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestedUsers;
