import "./Feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("post/timeline/64f24d45d9312ea294e9a2cf");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [posts.userId]); // Empty dependency array means this effect runs once on component mount.

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <p>No posts to display</p>
        )}
      </div>
    </div>
  );
}
