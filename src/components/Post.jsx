import {
  ChatBubbleOutlineOutlined,
  Favorite,
  IosShare,
  Publish,
  Repeat,
  Verified,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import "../css/Post.css";

const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar }, ref) => {
    const [like, setLike] = useState(false);

    const handleLike = () => {
      setLike(!like);
    };

    return (
      <div className="post" ref={ref}>
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
          <div className="post__footer">
            <ChatBubbleOutlineOutlined className="post__footerIcon" />
            <Repeat className="post__footerIcon" />
            <Favorite
              onClick={handleLike}
              className={
                like ? "post__footerIcon post__liked" : "post__footerIcon"
              }
            />
            <Publish className="post__footerIcon" />
            <IosShare className="post__footerIcon" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
