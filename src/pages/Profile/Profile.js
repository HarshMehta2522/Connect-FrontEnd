import "./Profile.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../../components/Feed/Feed";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(BACKEND+`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {user && user.coverPicture ? (
                <img
                  className="profileCoverImg"
                  src={user.coverPicture}
                  alt="usercoverImg"
                />
              ) : (
                <img
                  className="profileCoverImg"
                  src="https://res.cloudinary.com/dbvzq1grq/image/upload/v1696169703/person/pvl4qdcllhxat5dsxjrz.jpg"
                  alt="defaultProfileImg"
                />
              )}
              {user && user.profilePicture ? (
                <img
                  className="profileUserImg"
                  src={user.profilePicture}
                  alt="postprofileImg"
                />
              ) : (
                <img
                  className="profileUserImg"
                  src="https://res.cloudinary.com/dbvzq1grq/image/upload/v1696169703/person/pvl4qdcllhxat5dsxjrz.jpg"
                  alt="defaultProfileImg"
                />
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
