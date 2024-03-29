import React, { useEffect, useState } from "react";
import "../css/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import { auth, db, provider } from "../firebase-config";
import FlipMove from "react-flip-move";
import { Alert, Avatar, CircularProgress, Snackbar, useMediaQuery } from "@mui/material";
import { login, logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Twitter } from "@mui/icons-material";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(function (snapshot) {
        setPosts(
          snapshot.docs
            .map(function (doc) {
              const data = doc.data();
              if (!data.commentPost) { // check if commentPost field is not true
                setLoading(false);
                return { ...data, id: doc.id };
              }
              return null; // skip this post if commentPost field is true
            })
            .filter((post) => post !== null) // remove any null posts from the array
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

  function handleClick() {
    setOpen(prevOpen => !prevOpen)
  }

  function handleClose() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <div className="feed">
      {isSmallScreen ? (
        <div className="feed__phoneScreen">
          <div className="feed__phoneScreenTopHalf">
            {user ? (
              <>
              <Avatar
              src={user?.photoUrl}
              referrerPolicy="no-referrer"
              className="feed__profilePic"
              onClick={() => {
                signOut(); 
                handleClick();
              }}
              />
               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={user ? "success" : "info"} sx={{ width: '100%' }}>
        {user ? "Successfully Logged In." : "Successfully Logged Out."}
      </Alert>
    </Snackbar>
              </>      
            ) : (
              <>
              <Avatar
                src={user?.photoUrl}
                referrerPolicy="no-referrer"
                className="feed__profilePic"
                onClick={signIn}
                />
                 <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={user ? "success" : "info"} sx={{ width: '100%' }}>
        {user ? "Successfully Logged In." : "Successfully Logged Out."}
      </Alert>
    </Snackbar>
                </>
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
        <>
        <div className="feed__header">

        <div className="feed__TopHalf">
          <h2>Home</h2>
        </div>

        <div className="feed__BottomHalf">
            <div className="feed__forYouBig">
              <h3>For you</h3>
              <div className="feed__forYouSelectedBig"></div>
            </div>

            <div className="feed__followingBig">
              <h3>Following</h3>
            </div>
          </div>
        </div>
        </>
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
              key={post.id}
              displayName={post.displayName}
              commentPost={post.commentPost}
              username={post.username}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              likes={post.likes}
              likedBy={post.likedBy}
              comments={post.comments}
              commentCount={post.commentCount}
              image={post.image}
              postId={post.id}
            />
          ))}
        </FlipMove>
      )}
    </div>
  );
}
