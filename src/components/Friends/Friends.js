import "./Friends.css";

export default function Friends({user}) {
  return (
    <div>
      <li className="sidebarFriend">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="sidebarFriendImg"
        />
        <span className="siderbarFriendName">{user.username}</span>
      </li>
    </div>
  );
}
