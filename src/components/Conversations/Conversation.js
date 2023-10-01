import axios from "axios";
import "./Conversation.css";
import React, { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"/users?userId=" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      {user && user.profilePicture ? (
                <img
                  className="conversationImg"
                  src={user.profilePicture}
                  alt="postprofileImg"
                />
              ) : (
                <img
                  className="conversationImg"
                  src="https://res.cloudinary.com/dbvzq1grq/image/upload/v1696169703/person/pvl4qdcllhxat5dsxjrz.jpg"
                  alt="defaultProfileImg"
                />
              )}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
