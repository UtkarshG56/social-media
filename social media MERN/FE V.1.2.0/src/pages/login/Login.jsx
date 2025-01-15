import React, { useState, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState(""); // <-- useState for email
  const [passwordValue, setPasswordValue] = useState(""); // <-- useState for password

  const { isFetching, dispatch} = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    let res = await loginCall({email: emailValue, password: passwordValue},dispatch)
    if(res?.status === 200){
      localStorage.setItem("user", JSON.stringify(res?.data))
      navigate("/");
    }
  
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FLIP</h3>
          <span className="loginDesc">
            Connect with friends and the <br></br>world around you on FLIP.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              value={emailValue} // <-- controlled input
              onChange={(e) => setEmailValue(e.target.value)} // <-- onChange handler
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              value={passwordValue} // <-- controlled input
              onChange={(e) => setPasswordValue(e.target.value)} // <-- onChange handler
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/">
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}