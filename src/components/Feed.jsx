import React, { useEffect, useState } from "react";
import "../css/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import { auth, db, provider } from "../firebase-config";
import FlipMove from "react-flip-move";
import { Avatar, CircularProgress, useMediaQuery } from "@mui/material";
import { login, logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Twitter } from "@mui/icons-material";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(function (snapshot) {
        setPosts(
          snapshot.docs.map(function (doc) {
            setLoading(false);
            return doc.data();
          })
        );
      });
  }, []);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  const isSmallScreen = useMediaQuery("(max-width: 499px)");

  return (
    <div className="feed">
      {isSmallScreen ? (
        <div className="feed__phoneScreen">
          <div className="feed__phoneScreenTopHalf">
            {user ? (
              <Avatar
                src={user?.photoUrl}
                referrerPolicy="no-referrer"
                className="feed__profilePic"
                onClick={signOut}
              />
            ) : (
              <Avatar
                src={user?.photoUrl}
                referrerPolicy="no-referrer"
                className="feed__profilePic"
                onClick={signIn}
              />
            )}

            <Twitter className="feed__twitterIcon" />
            <div className="feed__emptySpaceDiv"></div>
          </div>

          <div className="feed__phoneScreenBottomHalf">
            <div className="feed__forYou">
              <h3>For you</h3>
              <div className="feed__forYouSelected"></div>
            </div>

            <div className="feed__following">
              <h3>Following</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="feed__header">
          <h2>Home</h2>
        </div>
      )}

      <TweetBox />
      {loading ? (
        <div className="loading__animation">
          <CircularProgress />
        </div>
      ) : (
        <FlipMove>
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
        </FlipMove>
      )}
    </div>
  );
}
