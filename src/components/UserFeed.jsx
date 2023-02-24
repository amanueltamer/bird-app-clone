import React, { useEffect, useState } from "react";
import "../css/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import { db } from "../firebase-config";
import FlipMove from 'react-flip-move';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Feed() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const displayNameNoSpaces = user?.displayName?.replace(/\s/g, "");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot(function(snapshot){
      setPosts(snapshot.docs.map(function(doc){
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

      <FlipMove>
      {posts.map((post) => (
        <Post
          key={post.text}
          displayName={user?.displayName}
          username={displayNameNoSpaces}
          verified={post.verified}
          text={post.text}
          avatar={user?.photoUrl}
          image={post.image}
        />
      ))}
    </FlipMove>
    </div>
  );
}
