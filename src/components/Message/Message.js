import { useContext, useEffect, useState } from "react";
import "./Message.css"
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Message({ message, own, conversation, currentUser }) {
  const [userdata, setUserdata] = useState(null);
  const { user } = useContext(AuthContext);

  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUser = async () => {
      try {
        const res = await axios.get(BACKEND+"/users?userId=" + friendId);
        setUserdata(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);
  
  // Determine whether to show the current user's profile picture or the other member's profile picture
  const profilePicture = own ? currentUser.profilePicture : userdata?.profilePicture;
  const profileLink = own ? `/profile/${user?.username}` : `/profile/${userdata?.username}`;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
      <Link to={profileLink} className="linkfix">
      {profilePicture ? (
                <img
                  className="messageImg"
                  src={profilePicture}
                  alt="postprofileImg"
                />
              ) : (
                <img
                  className="messageImg"
                  src="https://res.cloudinary.com/dbvzq1grq/image/upload/v1696169703/person/pvl4qdcllhxat5dsxjrz.jpg"
                  alt="defaultProfileImg"
                />
              )}
              </Link>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
