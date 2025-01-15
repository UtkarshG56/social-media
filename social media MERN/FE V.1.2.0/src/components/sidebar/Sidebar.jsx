import "./sidebar.css";
import React, { useState } from "react";
import {
  Chat,
  Person,
  SportsEsports,
  Create,
  Settings,
  Home, 
} from "@material-ui/icons"; 
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SuggestedUsers from "../alluser/Alluser";
import FriendList from "../alluser/FriendList";

export default function Sidebar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGIN_SUCCESS", payload: null });
  }

  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" className="sidebarIcon">
              <Home className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Home</span>
          </li>
          <li className="sidebarListItem">
            <Link to="/" className="sidebarIcon">
              <Chat className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Messages</span>
          </li>
          <li className="sidebarListItem">
            <Link to="/profile/:username" className="sidebarIcon">
              <Person className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem">
            <Link to="https://utkarshgames.netlify.app/" className="sidebarIcon">
              <SportsEsports className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Games</span>
          </li>
          <li className="sidebarListItem">
            <Link to="/" className="sidebarIcon">
              <Create className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Create Post</span>
          </li>
          <li className="sidebarListItem">
            <div className="Settingapp">
              <div onClick={toggleDropdown} className="sidebarIcon">
                <Settings className="sidebarIcon" />
              </div>
              <div className="csetting">
                <span className="sidebarListItemText1">Settings</span>
                {isDropdownOpen && (
                  <div className="sidebarDropdown">
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
        {location.pathname === "/" ? <SuggestedUsers /> : <FriendList />}
      </div>
    </div>
  );
}
