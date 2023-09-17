import "./Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Logout } from "../../context/AuthActions";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
  const { user,dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleEvent=(e)=>{
    dispatch(Logout());
    // console.log("first")
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="logo check">Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Serach for friend, post or vide"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topbarLink" style={{ color: "white" }}>
              HomePage
            </span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ChatIcon />
              <span className="topbarIconBadge">1</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
            <LogoutIcon className="logoutButton" onClick={handleEvent}/>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/default.jpeg"
            }
            alt="Person's Img"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
