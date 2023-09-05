import "./Friends.css";

export default function Friends({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="sidebarFriend">
        <img
          src={PF+user.profilePicture}
          alt="Profile"
          className="sidebarFriendImg"
        />
        <span className="siderbarFriendName">{user.username}</span>
      </li>
    </div>
  );
}
