import { ChatBubbleOutlineOutlined, FavoriteBorder, IosShare, Publish, Repeat, Verified } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import "../css/Post.css";

export default function Post({
    displayName,
    username,
    verified,
    text,
    image,
    avatar
}) {
  return (
    <div className='post'>
        <div className="post__avatar">
            <Avatar src={avatar}/>
        </div>
        <div className="post__body">
            <div className="post__header">
                <div className="post__headerText">
                    <h3>{displayName} {" "}
                        <span className='post__headerSpecial'>
                            {verified && <Verified className='post__badge' />} @{username}
                        </span>
                    </h3>
                </div>
                <div className="post__headerDescription">
                    <p>{text}</p>
                </div>
            </div>
            <img src={image} alt="" />
            <div className="post__footer">
                <ChatBubbleOutlineOutlined className='post__footerIcon'/>
                <Repeat className='post__footerIcon'/>
                <FavoriteBorder className='post__footerIcon'/>
                <Publish className='post__footerIcon'/>
                <IosShare className='post__footerIcon' />
            </div>
        </div>
    </div>
  )
}
