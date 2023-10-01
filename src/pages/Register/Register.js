import "./Register.css";
import { useRef, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const response = await axios.post(BACKEND + "/auth/register", user);
        if (response.status === 200) {
          setError(""); // Clear error message
          setSuccess("User registered successfully. Please log in.");
        }
      } catch (err) {
        if (err.response && err.response.status === 500) {
          // Display Material-UI Alert for internal server error
          setError("User already exists.");
          setSuccess(""); // Clear success message
        } else if (err.response && err.response.data.error === "User already exists") {
          // Display Material-UI Alert for user already exists
          setError("User already exists. Please register with a different username or email.");
          setSuccess(""); // Clear success message
        } else {
          console.log(err);
        }
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo"> Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              minLength={6}
              type="password"
              required
              className="loginInput"
            />
            <input
              placeholder=" Confirm Password"
              minLength={6}
              ref={passwordAgain}
              type="password"
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <div className="alertContainer">
              {error && (
                <Alert severity="error" onClose={() => setError("")}>
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" onClose={() => setSuccess("")}>
                  <AlertTitle>Success</AlertTitle>
                  {success}
                </Alert>
              )}
            </div>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Login into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
