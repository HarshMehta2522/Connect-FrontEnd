import "./Post.css";
import { Users } from "../../data";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function Post({ post }) {
   const [like,setLike]=useState(post.like);
   const [isLiked,setIsLiked]=useState(false);
   const likeHandler=()=>{
    setLike(isLiked?like-1:like+1)
    setIsLiked(!isLiked)
   }
   return (
    <div className="Post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter(u=>u.id===post.userId)[0].profilePicture}
              alt="postprofileImg"
            />
            <span className="postUsername">
            { Users.filter(u=>u.id===post.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="post Img " />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assests/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assests/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomright">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
