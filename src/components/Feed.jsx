import React, { useEffect, useState } from "react";
import "../css/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
// import db from "../firebase";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot) =>
  //     setPosts(snapshot.docs.map((doc) => doc.data()))
  //   );
  // }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      {posts.map((post) => (
        <Post
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
      <Post />
      <Post />
      <Post />
    </div>
  );
}
