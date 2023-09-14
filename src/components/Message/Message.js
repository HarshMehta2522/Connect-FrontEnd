import { useEffect, useState } from "react";
import "./Message.css"
import { format } from "timeago.js"
import axios from "axios";


export default function Message({ message, own, conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);
  
  // Determine whether to show the current user's profile picture or the other member's profile picture
  const profilePicture = own ? currentUser.profilePicture : user?.profilePicture;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={profilePicture ? PF + profilePicture : PF + "person/default.jpeg"} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
