import {
  ChatBubbleOutlineOutlined,
  Clear,
  Favorite,
  Publish,
  Repeat,
  Verified,
} from "@mui/icons-material";
import { Alert, Avatar, Snackbar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import "../css/Post.css";
import { db } from "../firebase-config";

import { Tooltip as ReactTooltip } from "react-tooltip";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPost } from "../features/postSlice";

import firebase from "firebase/compat/app";

const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar, postId }, ref) => {
    const [like, setLike] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const openPost = () => {
      dispatch(
        selectPost({
          displayName,
          username,
          verified,
          text,
          image,
          avatar,
          postId,
        })
      );
      navigate(`/thread/${postId}`);
      console.log(displayName);
    };

    const handleLike = () => {
      setLike(!like);
    };

    function deletePost(postId) {
      // Get the currently authenticated user
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        setError("User not authenticated!");
        return;
      }

      // Get the post to be deleted
      const postRef = db.collection("posts").doc(postId);
      postRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const post = doc.data();
            // Check if the post was created by the currently authenticated user
            if (post.userId !== currentUser.uid) {
              setError("You can only delete your own posts!");
              return;
            }
            // Delete the post
            postRef.delete().then(() => {
              console.log("Post deleted successfully!");
            });
          } else {
            console.log("Post not found!");
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }

    function handleClick() {
        setOpen(prevOpen => !prevOpen)
      }
    
      function handleClose() {
        setOpen(prevOpen => !prevOpen)
      }



    return (
      <div onClick={openPost} className="post" ref={ref}>
        {error && (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      
    )}
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <Verified className="post__badge" />} @{username}
                </span>
              </h3>
            </div>
            {image ? (
              <div className="post__headerDescription">
                <p>{text}</p>
              </div>
            ) : (
              <div className="post__headerDescriptionNoImg">
                <p>{text}</p>
              </div>
            )}
          </div>
          {image ? <img src={image} alt="" /> : null}
          <div
            className="post__footer"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <ChatBubbleOutlineOutlined className="post__footerIcon" />
            <Repeat className="post__footerIcon" />
            <Favorite
              onClick={handleLike}
              className={
                like ? "post__footerIcon post__liked" : "post__footerIcon"
              }
            />
            <Publish className="post__footerIcon" />
            <Clear
              className="post__footerIcon"
              id="delete__component"
              data-tooltip-content="Delete post?"
              onClick={() => {
                if (error) {
                  handleClick();
                  deletePost(postId);
                } else {
                  deletePost(postId);
                }
              }}
            />
            <ReactTooltip anchorId="delete__component" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
