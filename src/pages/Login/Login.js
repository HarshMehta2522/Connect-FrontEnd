import "./Login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const navigate = useNavigate();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    try {
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
    } catch (err) {
      console.log(err);
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
          {user && user.error  && (
            <div className="errorMessage">
              Login failed. Please check your credentials.
            </div>
          )}

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
