
import React, { useState, useEffect } from 'react';
import './Alluser.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function FriendList() {
  const [friendsList, setFriendsList] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    
     const fetchUser = async () => {
       try {
         const res = await axios.get(`http://localhost:8800/api/user/${user._id}`);
       
         localStorage.setItem("user", JSON.stringify(res.data));
        } catch (error) {
         console.error("Error fetching user:", error);
       }
     };
     fetchUser()
    
   }, [friendsList]);

  useEffect(() => {
    fetch('http://localhost:8800/api/user')
      .then((response) => response.json())
      .then((data) => setFriendsList(data))
      .catch((error) => console.error('Error fetching suggested users', error));
  }, []);

  const handleUnfollow = (followedUserId) => {
    fetch(`http://localhost:8800/api/user/${followedUserId}/unfollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user._id }),
    })
      .then((response) => {
        if (response.status === 200) {
          let updatedFriendsList = friendsList.filter((user) => user._id !== followedUserId);
          setFriendsList(updatedFriendsList);
        } else {
          console.error('Failed to Unfollow user');
        }
      })
      .catch((error) => console.error('Error following user', error));
  };

  return (
    <div>
      <h2>{"Friends"}</h2>
      <ul className="suggestname">
        {friendsList.filter((item) => user.following.includes(item._id)).map((user) => (
          <li className="suggestname1" key={user._id}>
            <span>{user.Username}</span>
            <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
