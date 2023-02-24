import {
  Ballot,
  GifBox,
  Image,
  LocationOn,
  Schedule,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "../css/TweetBox.css";
import { db } from "../firebase-config";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [error, setError] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

  const user = useSelector(selectUser)

  const toggleImageInput = () => {
    setShowImageInput(!showImageInput);
  }

  const sendTweet = (e) => {
    e.preventDefault();

    if (!tweetMessage && !tweetImage) {
      setError("Please enter a message or choose an image");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (tweetMessage.length > 280) {
      setError("The message must be less than 140 characters.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    db.collection("posts").add({
      displayName: "Amanuel Tamer",
      username: "tamer",
      verified: true,
      text: tweetMessage || null,
      image: tweetImage || null,
      avatar:
        "https://cdn.midjourney.com/68ab20f9-c22a-4d86-bd45-099475ee2f1f/grid_0.png",
    });

    setTweetMessage("");
    setTweetImage("");

  };

  return (
    <div className="tweetBox">
      {error && <div className="tweetBox__error">{error}</div>}
      <form>
        <div className="tweetBox__input">
          <Avatar src={user?.photoUrl} />
          <div className="tweetBox__inputContainer">
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            type="text"
            placeholder="What's happening?"
            />
            {showImageInput && <>
            <hr />
            <input value={tweetImage}
              onChange={(e) => setTweetImage(e.target.value)}
              className="tweetBox__imageInput"
              placeholder="Image URL"
              type="text" />
          </>}
            </div>
        </div>
        <div className="tweetBox__iconContainer">
          <div className="tweetBox__icons">
            <Image id="image__component" data-tooltip-content="insert image" onClick={toggleImageInput} className="tweetBox__icon" />
            <ReactTooltip anchorId="image__component" />
            <GifBox className="tweetBox__icon" />
            <Ballot className="tweetBox__icon" />
            <SentimentSatisfiedAlt className="tweetBox__icon" />
            <Schedule className="tweetBox__icon" />
            <LocationOn className="tweetBox__icon" />
          </div>
          <Button
            onClick={sendTweet}
            type="submit"
            className="tweetBox__tweetButton"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}
