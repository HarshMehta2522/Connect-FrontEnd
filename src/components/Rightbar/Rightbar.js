import "./Rightbar.css";
import Online from "../Online/Online";
import { Users } from "../../data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { loginCall } from "../../apiCalls";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser],user?._id);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user], currentUser);

  const handleClick = async () => {
    try {
      // console.log(followed,currentUser.followings,user?._id,currentUser.followings.includes(user?._id))
      if (followed === false) {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });

        dispatch({ type: "UNFOLLOW", payload: user._id });
        dispatch({ type: "UPDATE_FOLLOWINGS", payload: user._id });
      } else if (followed === true) {
        await axios.put(`/users/${user._id}/unfollow`, {
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

  // Check if user data is in local storage and update the currentUser
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, [dispatch]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b> you </b> and <b>3 other </b> friends also have a birhtday today
          </span>
        </div>
        <h4 className="rightbarTitle">Onlin Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
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
                    <span className="rightbarFollowingName">{friend.username}</span>
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
    </div>
  );
}
