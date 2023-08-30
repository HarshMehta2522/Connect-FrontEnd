import "./Rightbar.css";
import Online from "../Online/Online";
import { Users } from "../../data";
export default function Rightbar({ Profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assests/gift.png" alt="" />
          <span className="birthdayText">
            <b> you </b> and <b>3 other </b> friends also have a birhtday today
          </span>
        </div>
        <img className="rightAd" src="assests/ad.png" alt="" />
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
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">NY</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">India</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="assests/person/1.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">JohnWick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="assests/person/2.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">JohnWick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="assests/person/3.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">JohnWick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="assests/person/4.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">JohnWick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="assests/person/5.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">JohnWick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="assests/person/1.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">JohnWick</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {Profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
