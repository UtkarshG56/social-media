import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import NoAvatar from "../../assets/person/noAvatar.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Profile() {
  const {user, dispatch} = useContext(AuthContext);

  if(!user) {
    window.location.href = "/";
  }
  
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
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={"https://plus.unsplash.com/premium_photo-1661726959315-04d61ada6fd2?auto=format&fit=crop&q=80&w=1953&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={"https://marketplace.canva.com/EAFWqgieqss/1/0/1600w/canva-blue-and-peach-gradient-facebook-profile-picture-oBy0jAd4JFY.jpg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.Username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
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
