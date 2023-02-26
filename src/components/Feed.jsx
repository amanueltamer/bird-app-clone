import React, { useEffect, useState } from "react";
import "../css/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import { db } from "../firebase-config";
import FlipMove from 'react-flip-move';
import { CircularProgress } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(function(snapshot){
      setPosts(snapshot.docs.map(function(doc){
        setLoading(false)
        return doc.data()
      }))
    })
  }, [])

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />
      {loading ? <div className="loading__animation"><CircularProgress /></div> : <FlipMove>
      {posts.map((post) => (
        <Post
          key={post.text}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </FlipMove>}
    </div>
  );
}
