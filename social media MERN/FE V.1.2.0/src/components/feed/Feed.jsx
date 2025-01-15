import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const username = useParams()
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username?.username
        ? await axios.get("http://localhost:8800/api/posts/" + user._id)
        : await axios.get("http://localhost:8800/api/posts/timeline/all/" + user._id);
      setPosts(
        res.data.flat().sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const deletePost =(id)=>{
    axios.post(`http://localhost:8800/api/posts/${id}`,{ userId:user._id})
    .then(res => {
      if(res.status===200){
        let updatedposts = posts.filter(post => post._id !== id)
        setPosts(updatedposts)
      }
    })
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        { <Share />}
        {posts.length > 0 && posts.map((p) => (
          <Post key={p._id} post={p} deletePost={deletePost}/>
        ))}
      </div>
    </div>
  );
}
