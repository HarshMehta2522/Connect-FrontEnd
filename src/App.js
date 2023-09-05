import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import PersonIcon from "@mui/icons-material/Person";
import Register from "./pages/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
