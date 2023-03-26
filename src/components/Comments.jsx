import { ChatBubbleOutlineOutlined, Clear, Favorite, Publish, Repeat, Verified } from '@mui/icons-material';
import { Alert, Avatar, Snackbar } from '@mui/material';
import React, { forwardRef, useState } from 'react'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { db } from '../firebase-config';
import "../css/Comments.css"
import firebase from "firebase/compat/app";



const Comments = forwardRef(
    ({ displayName, username, verified, text, image, avatar, commentsId }, ref) => {
    const [like, setLike] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);



        const handleLike = () => {
            setLike(!like);
          };

          function deleteComment(postId) {
            // Get the currently authenticated user
            const currentUser = firebase.auth().currentUser;
            if (!currentUser) {
              setError("User not authenticated!");
              return;
            }
      
            // Get the post to be deleted
            const commentRef = db.collection("comments").doc(postId);
            commentRef
              .get()
              .then((doc) => {
                if (doc.exists) {
                  const comment = doc.data();
                  // Check if the post was created by the currently authenticated user
                  if (comment.userId !== currentUser.uid) {
                    setError("You can only delete your own posts!");
                    return;
                  }
                  // Delete the post
                  commentRef.delete().then(() => {
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
    <div className='comments' ref={ref}>
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
        <div className="comments__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="comments__body">
          <div className="comments__header">
            <div className="comments__headerText">
              <h3>
                {displayName}{" "}
                <span className="comments__headerSpecial">
                  {verified && <Verified className="comments__badge" />} @{username}
                </span>
              </h3>
            </div>
            {image ? (
              <div className="comments__headerDescription">
                <p>{text}</p>
              </div>
            ) : (
              <div className="comments__headerDescriptionNoImg">
                <p>{text}</p>
              </div>
            )}
          </div>
          {image ? <img src={image} alt="" /> : null}
          <div className="comments__footer" onClick={(event) => {
                event.stopPropagation();
            }}>
            <ChatBubbleOutlineOutlined className="comments__footerIcon" />
            <Repeat className="comments__footerIcon" />
            <Favorite
              onClick={handleLike}
              className={
                like ? "comments__footerIcon comments__liked" : "comments__footerIcon"
              }
            />
            <Publish className="comments__footerIcon" />
            <Clear
              className="comments__footerIcon"
              id="delete__component"
              data-tooltip-content="Delete comment?"
              onClick={() => {
                if (error) {
                  handleClick();
                  deleteComment(commentsId);
                } else {
                  deleteComment(commentsId);
                }
              }}
            />
            <ReactTooltip anchorId="delete__component" />
          </div>
        </div>
    </div>
  )
}
)

export default Comments;