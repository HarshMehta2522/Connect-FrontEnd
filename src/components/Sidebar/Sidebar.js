import "./Sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import { AuthContext } from "../../context/AuthContext";

// import { Users } from "../../data";
// import Friends from "../Friends/Friends";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
export default function Sidebar() {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "/users/friends/" + currentUser?._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser?._id, currentUser]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon" />
            <span className="siderbarListItemText">Events</span>
          </li>
          <div className="sidebarFriend">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                className="sidebarFriendList"
                key={friend._id}
              >
                <div className="sidebarFriends">
                  <img
                    className="sidebarFriendImg"
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/default.jpeg"
                    }
                    alt=""
                  />
                  <span className="sidebarFriendName">{friend.username}</span>
                </div>
              </Link>
            ))}
          </div>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="siderbarFriendList"></ul>
      </div>
    </div>
  );
}
