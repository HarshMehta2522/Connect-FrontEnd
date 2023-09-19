import axios from "axios";
import "./Conversation.css";
import React, { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(BACKEND+"/users?userId=" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture?PF+user.profilePicture:PF+"person/default.jpeg"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
