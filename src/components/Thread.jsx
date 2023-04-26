import {
    ArrowBack,
    Bookmark,
    ChatBubbleOutlined,
    ChatBubbleOutlineOutlined,
    Clear,
    Favorite,
    GifBox,
    Image,
    LocationOn,
    More,
    MoreHoriz,
    Publish,
    Repeat,
    SentimentSatisfiedAlt,
    Verified,
  } from "@mui/icons-material";
  import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  // import { useSelector } from 'react-redux';
  import { useNavigate, useParams } from "react-router-dom";
  // import { selectOpenPost } from '../features/postSlice';
  import "../css/Thread.css";
  import { addLike, selectLikeCount, selectOpenPost, selectPrevPost, selectPrevPostId, updatePost } from "../features/postSlice";
  import { selectUser } from "../features/userSlice";
  import { auth, db } from "../firebase-config";
  // import Post from "./Post";
  import firebase from "firebase/compat/app";
  import Post from "./Post";
  import Comments from "./Comments";
  import FlipMove from "react-flip-move";
  import { selectPost } from "../features/postSlice";
  
  
  export default function Thread() {
    const [commentMessage, setCommentMessage] = useState("");
    const [commentImage, setCommentImage] = useState("");
    const [error, setError] = useState("");
    const [showImageInput, setShowImageInput] = useState(false);
    const [textareaOpened, setTextareaOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [posts, setPosts] = useState([]);
  
    const dispatch = useDispatch();
    const currentUser = firebase.auth().currentUser;

    const navigate = useNavigate();


    // const likeCount = useSelector(selectLikeCount);
    const { postId, commentsId } = useParams();

    const user = useSelector(selectUser);
    const selectedPost = useSelector(selectOpenPost);
  //   const prevPostId = useSelector(selectPrevPostId)
  const prevPost = useSelector(selectPrevPost);


  const goBack = () => {
      if (!selectedPost.commentPost) {
        // Navigate to home page
        navigate('/');
      } else if (prevPost && prevPost.postId !== selectedPost.postId) {
        // Navigate to previous post
        navigate(`/thread/${prevPost.postId}`);
        // Set previous post as selectedPost
        dispatch(selectPost(prevPost));
      } else {
        // Navigate to thread page for the same post
        navigate(`/thread/${selectedPost.postId}`);
      }
    };
    
    
  
    useEffect(() => {
      if (!selectedPost || selectedPost.postId !== postId) {
        // Fetch post data for postId and dispatch selectPost action
        dispatch(selectPost({ postId }));
      }
    }, [dispatch, postId, selectedPost]);
  
    const textareaOpener = () => {
      setTextareaOpened(true);
      console.log("text area opened!", textareaOpened);
    };
  
    const toggleImageInput = () => {
      setShowImageInput(!showImageInput);
    };
  
    useEffect(() => {
      setLoading(true);
      // Listen for new posts and add them to the posts array
      const unsubscribe = db.collection("posts")
        .where("commentPost", "==", true)
        .where("postId", "==", postId)
        .orderBy("timestamp", "desc")
        .onSnapshot(function (snapshot) {
          const newPosts = snapshot.docs.map(function (doc) {
            setLoading(false);
            return { ...doc.data(), id: doc.id };
          });
          setPosts(newPosts);
        });
      // Unsubscribe from the listener when the component unmounts
      return unsubscribe;
    }, [postId]);
    
  
    const sendComment = (e) => {
      e.preventDefault();
  
      const userId = auth.currentUser.uid;
  
      if (!commentMessage && !commentImage) {
        setError("Please enter a message or choose an image");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
  
      if (commentMessage.length > 280) {
        setError("The message must be less than 140 characters.");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
  
      if (!user) {
        setError("You must be signed in to create a post.");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
  
      console.log(userId);
  
      console.log(user);
  
      db.collection("posts")
        .add({
          postId: postId, // the ID of the post that the comment is associated with
          displayName: user.displayName,
          username: user?.displayName?.replace(/\s/g, ""),
          verified: true,
          text: commentMessage || null,
          image: commentImage || null,
          avatar: user.photoUrl,
          userId: userId, // add user ID field to post
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // add timestamp field to post
          commentPost: true,
          likes: 0,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          const newComment = {
              id: docRef.id,
              displayName: user.displayName,
              username: user?.displayName?.replace(/\s/g, ""),
              verified: true,
              text: commentMessage || null,
              image: commentImage || null,
              avatar: user.photoUrl,
              userId: userId,
              timestamp: new Date().toISOString(),
              commentPost: true,
              likes: 0,
            };
          setPosts([newComment, ...posts]);
          setCommentMessage("");
          setCommentImage("");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    };
  
    const keyDownHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        // handle Ctrl/Command + Enter
        e.preventDefault();
        sendComment(e);
      }
    };

    const handleLike = (postId) => {
  const user = firebase.auth().currentUser;
  const postRef = db.collection("posts").doc(postId);

  postRef.get().then((doc) => {
    if (doc.exists) {
      const currentLikes = doc.data().likes || null;
      const likedBy = doc.data().likedBy || [];

      if (likedBy.includes(user.uid)) {
        // user has already liked the post, so unlike it
        postRef.update({
          likes: currentLikes - 1,
          likedBy: likedBy.filter((userId) => userId !== user.uid),
        })
          .then(() => {
            console.log("Post successfully unliked!");
            postRef.get().then((doc) => {
              if (doc.exists) {
                // Dispatch an action to update the selected post in the Redux store
                const updatedPost = { ...doc.data(), postId: doc.id };
                console.log("Updated post after unlike: ", updatedPost);
                dispatch(updatePost(updatedPost));
                console.log("Selected post after unlike: ", selectedPost);
              }
            });
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
            postRef.get().then((doc) => {
              if (doc.exists) {
                // Dispatch an action to update the selected post in the Redux store
                const updatedPost = { ...doc.data(), postId: doc.id };
                console.log("Updated post after like: ", updatedPost);
                dispatch(updatePost(updatedPost));
                console.log("Selected post after like: ", selectedPost);
              }
            });
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


  
    console.log(selectedPost);
  
    console.log(postId);
    // console.log(comments);
    // console.log(commentsId);
    // console.log(posts);
  
  
    return (
      <div className="thread">
        <div className="thread__container">
          <div className="thread__header">
            <IconButton
              onClick={() => {
                  goBack()
                  // navigate(-1);
              }}
              className="thread__backButton"
            >
              <ArrowBack />
            </IconButton>
            <h2>Tweet</h2>
          </div>
  
          <div className="thread__userInfo">
            <div className="thread__avatar">
              <Avatar src={selectedPost?.avatar} />
            </div>
            <h3 className="thread__username">
              <div className="thread__namesAndMore">
                <div className="thread__displayNameVerified">
                  {selectedPost?.displayName}
                  {selectedPost?.verified && (
                    <Verified className="thread__badge" />
                  )}
                </div>
                <MoreHoriz className="thread__more" />
              </div>
              <span className="thread__headerSpecial">
                @{selectedPost?.username}
              </span>
            </h3>
          </div>
  
          <div className="thread__postText">
            <p>{selectedPost?.text}</p>
          </div>
  
          <div className="thread__postImage">
            {selectedPost?.image ? (
              <img src={selectedPost?.image} alt="" />
            ) : null}
          </div>
  
          <hr />
  
          <div className="thread__footer">
            <ChatBubbleOutlineOutlined className="thread__footerIcon" />
            <Repeat className="thread__footerIcon" />
            <div className="thread__likeButton">
            <Favorite onClick={() => handleLike(postId)}
                className={
                  selectedPost?.likedBy?.includes(currentUser?.uid)
                    ? "thread__footerIcon thread__liked"
                    : "thread__footerIcon"
                } />
                <span className="thread__likeCount">{selectedPost?.likes}</span>
            </div>
            <Bookmark className="thread__footerIcon" />
            <Publish className="thread__footerIcon" />
          </div>
  
          <hr />
  
          <p className="thread__replyingTo">Replying to <span className="thread__replyingToName">@{selectedPost?.username}</span></p>
  
          <div className="thread__inputContainer">
              <div className="thread__avatar">
            <Avatar src={selectedPost?.avatar} />
          </div>
  
            <form>
              {textareaOpened ? (
                <div className="thread__inputContainerOpen">
                  <textarea
                    onClick={textareaOpener}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    value={commentMessage}
                    placeholder="Tweet your reply"
                    className="thread__textarea"
                    onKeyDown={keyDownHandler}
                  />
                  {showImageInput && (
                <>
                  <hr />
                  <textarea
                    value={commentImage}
                    onChange={(e) => setCommentImage(e.target.value)}
                    className="thread__textarea"
                    placeholder="Image URL"
                    onKeyDown={keyDownHandler}
                  />
                </>
              )}
                  <div className="thread__iconAndButton">
  
                  <div className="thread__icons">
                    <Image
                    className="thread__icon"
                    onClick={toggleImageInput} />
                    <GifBox className="thread__icon" />
                    <SentimentSatisfiedAlt className="thread__icon" />
                    <LocationOn className="thread__icon" />
                  </div>
  
                  <Button
                    onClick={sendComment}
                    type="submit"
                    className="thread__replyButton"
                    >
                    Reply
                  </Button>
                      </div>
                </div>
              ) : (
                <div className="thread__inputContainerClosed">
                  <textarea
                    onClick={textareaOpener}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    value={commentMessage}
                    placeholder="Tweet your reply"
                    className="thread__textarea"
                    onKeyDown={keyDownHandler}
                  />
  
                  <Button
                    // onClick={sendTweet}
                    type="submit"
                    className="thread__replyButton"
                  >
                    Reply
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
  
        {loading && !posts ? (
    <div className="loading__animation">
      <CircularProgress />
    </div>
  ) : null}
  
  {!loading && posts && posts.length > 0 ? (
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
          image={post.image}
          postId={post.id}
        />
      ))}
    </FlipMove>
  ) : null}
  
  
      </div>
    );
  }
  