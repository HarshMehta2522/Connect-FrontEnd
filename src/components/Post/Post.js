import React from "react";
import "./Post.css";
import { useState, useEffect, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const options = ["edit", "delete"];

const ITEM_HEIGHT = 48;
export default function Post({ post,onPostChange }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BACKEND = process.env.REACT_APP_BACKEND_URL; 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const likeHandler = () => {
    try {
      axios.put(BACKEND+"/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(BACKEND+`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Send a DELETE request to your server to delete the post by its ID
      await axios.delete(BACKEND+`/post/${post?._id}`, {
        data: { userId: currentUser?._id },
      });
      onPostChange();
      // Once the post is deleted successfully, you can perform any necessary actions
      // such as updating the UI or redirecting the user.
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };
  return (
    <div className="Post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              {user && (
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/default.jpeg"
                  }
                  alt="postprofileImg"
                />
              )}
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <div className="moreButton">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                <ul className="menu-list" >
                  <li className="menu-item" onClick={handleEdit} >
                    Edit
                  </li>
                  <li className="menu-item" onClick={handleDelete}>
                    Delete
                  </li>
                </ul>
              </Menu>
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="post Img " />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomright">
            <span className="postCommentText">comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
