import {
  ChatBubbleOutlineOutlined,
  Clear,
  Favorite,
  Publish,
  Repeat,
  Verified,
} from "@mui/icons-material";
import { Alert, Avatar, Snackbar } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import "../css/Post.css";
import { auth, db } from "../firebase-config";

import { Tooltip as ReactTooltip } from "react-tooltip";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLike, selectLikeCount, selectPost } from "../features/postSlice";

import firebase from "firebase/compat/app";

const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar, postId, commentPost, likes, likedBy }, ref) => {
    const [like, setLike] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const likeCount = useSelector(selectLikeCount);
    // const userId = auth.currentUser.uid;

    const navigate = useNavigate();
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser)

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
          commentPost,
          likes,
          likedBy,
        })
      );
      navigate(`/thread/${postId}`);
      console.log(displayName);
    };

    console.log(likes)
    console.log(commentPost)


    const handleLike = (postId) => {
      setLike(!like);
      const user = firebase.auth().currentUser;
      const postRef = db.collection("posts").doc(postId);
    
      postRef.get().then((doc) => {
        if (doc.exists) {
          const currentLikes = doc.data().likes || 0;
          const likedBy = doc.data().likedBy || [];
    
          if (likedBy.includes(user.uid)) {
            // user has already liked the post, so unlike it
            postRef.update({
              likes: currentLikes - 1,
              likedBy: likedBy.filter((userId) => userId !== user.uid),
            })
              .then(() => {
                console.log("Post successfully unliked!");
              })
              .catch((error) => {
                console.error("Error updating post likes: ", error);
              });
          } else {
            // user has not liked the post, so like it
            postRef.update({
              likes: currentLikes + 1,
              likedBy: [...likedBy, user.uid],
            })
              .then(() => {
                console.log("Post successfully liked!");
              })
              .catch((error) => {
                console.error("Error updating post likes: ", error);
              });
          }
        } else {
          console.log("No such document!");
        }
      });
    };
    

    // console.log(userId)
    console.log(likeCount)

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
      <Snackbar open={open} autoHideDuration={6000} onClose={(event) => {
        event.stopPropagation();
        handleClose()
      }}>
        <Alert
          onClose={(event) => {
            event.stopPropagation();
            handleClose();
          }}
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
            <ChatBubbleOutlineOutlined 
            onClick={openPost} className="post__footerIcon" />
            <Repeat className="post__footerIcon" />
            <div className="post__likeButton">
            <Favorite onClick={() => handleLike(postId)}
                className={
                  likedBy?.includes(currentUser?.uid)
                    ? "post__footerIcon post__liked"
                    : "post__footerIcon"
                } />
                <span className={
                  !likes ? "post__likeCountZero" : "post__likeCount"
                }>{likes}</span>
            </div>
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
