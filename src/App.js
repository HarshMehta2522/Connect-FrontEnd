import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Messenger from "./pages/Messenger/Messenger";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import {AuthContext} from "./context/AuthContext"
function App() {
  const {user}=useContext(AuthContext);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user?<Home />:<Login/>} />
          <Route exact path="/login" element={user?<Navigate to ="/"/>:<Login/>} />
          <Route exact path="/register" element={user?<Navigate to="/"/>:<Register />} />
          <Route exact path="/Messenger" element={!user?<Navigate to="/"/>:<Messenger />} />
          <Route exact path="/profile/:username" element={user?<Profile />:<Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
