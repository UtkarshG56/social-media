import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NoAvatar from "../../assets/person/noAvatar.png";

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
export default function Topbar() {
  const { user,dispatch } = useContext(AuthContext);
  const logOut = () =>{
    localStorage.clear();
    dispatch({ type: "LOGIN_SUCCESS", payload: null });
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FLIP</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem1" onClick={() => logOut()}>
            <ExitToAppOutlinedIcon />
          </div>
        </div>
        <Link to={`/profile/${user?.Username}`}>
          <img
            src={"https://marketplace.canva.com/EAFWqgieqss/1/0/1600w/canva-blue-and-peach-gradient-facebook-profile-picture-oBy0jAd4JFY.jpg"}
            alt="aaaaaa"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
