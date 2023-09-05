import "./Topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom';
export default function Topbar() {
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link style={{textDecoration:"none"}} to="/">

            <span className="logo check">Social</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchBar">
                <SearchIcon className="searchIcon"/> 
                <input placeholder="Serach for friend, post or vide" className="searchInput"/>
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">HomePage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <PersonIcon/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <ChatIcon/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <NotificationsIcon/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <img src="/assets/person/1.jpeg" alt="Person's Img" className="topbarImg"/>
        </div>
    </div>
  )
}
