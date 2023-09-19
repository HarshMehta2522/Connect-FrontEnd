import "./Rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import { Alert, AlertTitle } from "@mui/material";

export default function Rightbar({
  user,
  messenger,
  setShouldReloadConversations,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  const [friends, setFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const [showAlert, setShowAlert] = useState(false); // State for showing the Alert

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);

  useEffect(() => {
    const getnewFriends = async () => {
      try {
        const newfriendList = await axios.get(BACKEND+"/users/all/"+currentUser._id);
        setNewFriends(newfriendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getnewFriends();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(BACKEND+"/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, currentUser]);

  const handleClick = async () => {
    try {
      if (followed === false) {
        await axios.put(BACKEND+`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });

        dispatch({ type: "UNFOLLOW", payload: user._id });
        dispatch({ type: "UPDATE_FOLLOWINGS", payload: user._id });
      } else if (followed === true) {
        await axios.put(BACKEND+`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });

        dispatch({ type: "FOLLOW", payload: user._id });
        dispatch({ type: "UPDATE_UNFOLLOWINGS", payload: user._id });
      }

      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, [dispatch]);

  const handleAddToChat = async (receiverId, e) => {
    e.preventDefault();

    try {
      const response = await axios.post(BACKEND+"/conversations", {
        sender: currentUser._id,
        receiverId: receiverId,
      });

      if (response.status === 201) {
        // Conversation already exists, show the alert
        setShowAlert(true);
      } else {
        // Conversation doesn't exist, create a new one
        setShouldReloadConversations(true);
        console.log("New conversation created:", response.data);
      }
    } catch (error) {
      console.error("Error creating/checking conversation:", error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Suggested Friends</h4>
        <ul className="rightbarFriendList">
          {newFriends.map((newfriend) => (
            <Link
              to={"/profile/" + newfriend.username}
              style={{ textDecoration: "none" }}
              key={newfriend._id}
            >
              <div className="rightbarNewFriend">
                <img
                  className="rightbarNewFriendImg"
                  src={
                    newfriend.profilePicture
                      ? PF + newfriend.profilePicture
                      : PF + "person/default.jpeg"
                  }
                  alt=""
                />
                <span className="rightbarNewFriendName">
                  {newfriend.username}
                </span>
                <div className="addToChatButton">
                  {messenger && (
                    <Button
                      variant="contained"
                      href="#contained-buttons"
                      onClick={(e) => handleAddToChat(newfriend?._id, e)}
                    >
                      Chat
                    </Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user ? (
          <>
            {user?.username !== currentUser?.username && (
              <button className="rightbarFollowButton" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <RemoveIcon /> : <AddIcon />}
              </button>
            )}
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 2
                    ? "Married"
                    : "-"}
                </span>
              </div>
            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
              {friends.map((friend) => (
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                  key={friend._id}
                >
                  <div className="rightbarFollowing">
                    <img
                      className="rightbarFollowingImg"
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "person/default.jpeg"
                      }
                      alt=""
                    />
                    <span className="rightbarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
      <div className="alertWrapper">
  {showAlert && (
    <Alert
      severity="info"
      onClose={() => setShowAlert(false)}
      className="rightbarAlert"
    >
      <AlertTitle>Info</AlertTitle>
      This conversation already exists
    </Alert>
  )}
</div>

    </div>
  );
}
