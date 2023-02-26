import {
  BookmarkBorder,
  Home,
  ListAlt,
  MailOutline,
  MoreHoriz,
  NotificationsNone,
  PermIdentity,
  Search,
  Twitter,
  Verified,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import "../css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { auth, provider } from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { logout } from "../features/userSlice";

export default function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const displayNameNoSpaces = user?.displayName?.replace(/\s/g, "");

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

  return (
    <div className="sidebar">
      <div className="sidebar__topContainer">
        <Twitter className="sidebar__twitterIcon" />

        <SidebarOption active Icon={Home} text="Home" />
        <SidebarOption Icon={Search} text="Explore" />
        <SidebarOption Icon={NotificationsNone} text="Notifcations" />
        <SidebarOption Icon={MailOutline} text="Messages" />
        <SidebarOption Icon={BookmarkBorder} text="Bookmarks" />
        <SidebarOption Icon={ListAlt} text="Lists" />
        <SidebarOption Icon={PermIdentity} text="Profile" />
        <SidebarOption Icon={MoreHoriz} text="More" />

        <Button variant="outlined" className="sidebar__tweet" fullWidth>
          Tweet
        </Button>

        {user ? (
          <Button
            variant="outlined"
            className="sidebar__signIn"
            fullWidth
            onClick={signOut}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="sidebar__signIn"
            fullWidth
            onClick={signIn}
          >
            Sign In
          </Button>
        )}

      </div>

      {user ? (<div className="sidebar__bottomContainer">
        <div className="sidebar__avatar">
          <Avatar
            src={user?.photoUrl}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="sidebar__userSeperator">

          <div className="sidebar__userInfo">
            <div className="sidebar__displayNameContainer">
            <h2 className="sidebar__displayName">{user?.displayName}{""}</h2>
            <span><Verified className="sidebar__badge" /></span>
            </div>
            <h3 className="sidebar__username">@{displayNameNoSpaces}</h3>
          </div>

          <MoreHoriz className='more__icon'/>

        </div>
      </div> ) : null}

    </div>
  );
}
