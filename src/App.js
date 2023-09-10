import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import PersonIcon from "@mui/icons-material/Person";
import Register from "./pages/Register/Register";
import { BrowserRouter, Navigate, Route, Routes,useNavigate } from "react-router-dom";
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
          <Route exact path="/profile/:username" element={user?<Profile />:<Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
