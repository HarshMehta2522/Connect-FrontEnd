import "./Profile.css";
import Topbar from "../../components/Topbar/Topbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Rightbar from "../../components/Rightbar/Rightbar"
import Feed from "../../components/Feed/Feed"

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assests/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assests/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Safak Kocaoglu</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar Profile/>
          </div>
        </div>
      </div>
    </>
  );
}