import "./Feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  const { user } = useContext(AuthContext);
  const [refreshFeed, setRefreshFeed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(`${BACKEND}/post/profile/${username}`)
          : await axios.get(`${BACKEND}/post/timeline/${user._id}`);

        setPosts(response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));

      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username, user._id, refreshFeed]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} onPostChange={() => setRefreshFeed(true)} />)
        ) : (
          <p>No posts to display</p>
        )}
      </div>
    </div>
  );
}
