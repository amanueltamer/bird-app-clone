import {
  Add,
  BookmarkBorder,
  Home,
  ListAlt,
  Login,
  Logout,
  MailOutline,
  MoreHoriz,
  NotificationsNone,
  PermIdentity,
  Search,
  Twitter,
  Verified,
} from "@mui/icons-material";
import { Alert, Avatar, Button, Snackbar, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import "../css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { auth, provider } from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { logout } from "../features/userSlice";

export default function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const displayNameNoSpaces = user?.displayName?.replace(/\s/g, "").toLowerCase();

  const isSmallScreen = useMediaQuery("(max-width: 1100px)");

  const [open, setOpen] = useState(false)

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

  function handleClick() {
    setOpen(prevOpen => !prevOpen)
  }

  function handleClose() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <div className="sidebar">
      <div className="sidebar__topContainer">
        <div className="sidebar__twitterIconContainer">
          <Twitter className="sidebar__twitterIcon" />
        </div>

        <SidebarOption active Icon={Home} text="Home" />
        <SidebarOption Icon={Search} text="Explore" />
        <SidebarOption Icon={NotificationsNone} text="Notifcations" />
        <SidebarOption Icon={MailOutline} text="Messages" />
        <SidebarOption Icon={BookmarkBorder} text="Bookmarks" />
        <SidebarOption Icon={ListAlt} text="Lists" />
        <SidebarOption Icon={PermIdentity} text="Profile" />
        <SidebarOption Icon={MoreHoriz} text="More" />

        {isSmallScreen ? (
          <div className="sidebar__tweetQueryContainer">
            <Add className="sidebar__tweetQuery"/>
          </div>
        ) : (
          <Button variant="outlined" className="sidebar__tweet" fullWidth>
            Tweet
          </Button>
        )}

{isSmallScreen ? (
  <>
    {user ? (
      <div className="sidebar__userSignInContainer">
        <Logout className="sidebar__SignInSmallScreen" onClick={() => {
          signOut();
          handleClick();
        }}/>
      </div>
    ) : (
      <div className="sidebar__userSignInContainer">
        <Login className="sidebar__SignInSmallScreen" onClick={signIn} />
      </div>
    )}
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={user ? "success" : "info"} sx={{ width: '100%' }}>
        {user ? "Successfully Logged In." : "Successfully Logged Out."}
      </Alert>
    </Snackbar>
  </>
) : (
  <>
    {user ? (
    <>
      <Button
        variant="outlined"
        className="sidebar__signIn"
        fullWidth
        onClick={() => {
          signOut(); 
          handleClick();
        } }
      >
        Log Out
      </Button>
    </>
    ) : (
      <>
      <Button
        variant="outlined"
        className="sidebar__signIn"
        fullWidth
        onClick={signIn}
      >
        Log In
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={user ? "success" : "info"} sx={{ width: '100%' }}>
        {user ? "Successfully Logged In." : "Successfully Logged Out."}
      </Alert>
    </Snackbar>
    </>
    )}
  </>
)}

      </div>

      {user ? (
        <div className="sidebar__bottomContainer">
          <div className="sidebar__avatar">
            <Avatar src={user?.photoUrl} referrerPolicy="no-referrer" />
          </div>

          <div className="sidebar__userSeperator">
            <div className="sidebar__userInfo">
              <div className="sidebar__displayNameContainer">
                <h2 className="sidebar__displayName">
                  {user?.displayName}
                  {""}
                </h2>
                <span>
                  <Verified className="sidebar__badge" />
                </span>
              </div>
              <h3 className="sidebar__username">@{displayNameNoSpaces}</h3>
            </div>

            <MoreHoriz className="more__icon" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
