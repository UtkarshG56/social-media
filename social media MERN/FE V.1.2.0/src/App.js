
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./assets/style.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
 const {user} = useContext(AuthContext);
  return (
    !user ?
     <Routes>
      <Route path="/" element={ <Register />} />
      <Route path="/login" element={ <Login />} />
      <Route path="/register" element={ <Register />} />
      <Route path="*" element={ <Navigate to="/login"/>} />
    </Routes>
      : 
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="*" element={ <Navigate to="/"/>} />
    </Routes>
  );
}

export default App;
