import { Ballot, GifBox, Image, LocationOn, Schedule, SentimentSatisfiedAlt } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import "../css/TweetBox.css";

export default function TweetBox() {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://picsum.photos/200" />
          <input type="text" placeholder="What's happening?" />
        </div>
        <div className="tweetBox__iconContainer"> 
        <div className="tweetBox__icons">
            <Image className="tweetBox__icon"/>
            <GifBox className="tweetBox__icon"/>
            <Ballot className="tweetBox__icon"/>
            <SentimentSatisfiedAlt className="tweetBox__icon"/>
            <Schedule className="tweetBox__icon"/>
            <LocationOn className="tweetBox__icon"/>
        </div>
        <Button className="tweetBox__tweetButton">Tweet</Button>
        </div>
      </form>
    </div>
  );
}
