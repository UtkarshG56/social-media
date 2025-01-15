import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const Username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const apiUrl = "http://localhost:8800"; 

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        Username: Username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${apiUrl}/api/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
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
              placeholder="Username"
              required
              ref={Username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login"style={{textAlign:"center"}} >
              <button className="loginRegisterButton">
              Already Have An Account
                </button> 
              </Link>
          </form>
        </div>
      </div>
    </div>
  );
}