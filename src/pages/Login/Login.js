import "./Login.css";
import { useContext, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const navigate = useNavigate();
  const password = useRef();
  const [error, setError] = useState("");
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(""); // State to hold login error

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );

      if (response && response.error) {
        // Display Material-UI Alert for login error
        setError("Wrong Password");
        setLoginError("Login failed. Please check your credentials.");
  
        // Log the error variable
      } else {
        setLoginError("");
        setError("Wrong Credential");
        // Clear login error message
      }
    } catch (err) {
      if (err.response && err.response.status === 502) {
        // Display Material-UI Alert for internal server error
        setError("Wrong Password.");
      // Log the error variable
      } else if (err.response && err.response.data.error === "User not found") {
        // Display Material-UI Alert for user not found
        setError("User not found");
        
      } else {
        console.log(err);

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
        <div className="alertContainer">
          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
        </div>

          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              minLength={6}
              required
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="30px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot" style={{ fontSize: "17px" }}>
              Forgot Password?
            </span>

            <button
              className="loginButton"
              onClick={() => navigate("/register")}
            >
              {`Create New User`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
