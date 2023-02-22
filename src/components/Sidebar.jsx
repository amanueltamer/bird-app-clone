import { BookmarkBorder, Home, ListAlt, MailOutline, MoreHoriz, NotificationsNone, PermIdentity, Search, Twitter } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import React from 'react'
import "../css/Sidebar.css"
import SidebarOption from './SidebarOption'
import { auth, provider} from '../firebase-config'
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";


export default function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
      .catch(error => alert(error.message));
  };


  return (
    <div className='sidebar'>
      <div className="sidebar__topContainer">
        <Twitter className='sidebar__twitterIcon'/>

        <SidebarOption active Icon={Home} text="Home" />
        <SidebarOption Icon={Search} text="Explore" />
        <SidebarOption Icon={NotificationsNone} text="Notifcations" />
        <SidebarOption Icon={MailOutline} text="Messages" />
        <SidebarOption Icon={BookmarkBorder} text="Bookmarks" />
        <SidebarOption Icon={ListAlt} text="Lists" />
        <SidebarOption Icon={PermIdentity} text="Profile" />
        <SidebarOption Icon={MoreHoriz} text="More" />
        
        <Button variant='outlined' className='sidebar__tweet' fullWidth >Tweet</Button>
        <Button variant='outlined' className='sidebar__signIn' fullWidth onClick={signIn} >Sign In</Button>
      </div>

      <div className="sidebar__bottomContainer">
        <Avatar src={user?.photoUrl} referrerPolicy="no-referrer"/>
      </div>
    </div>

  )
}
