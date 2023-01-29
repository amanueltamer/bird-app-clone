import { BookmarkBorder, Home, ListAlt, MailOutline, MoreHoriz, NotificationsNone, PermIdentity, Search, Twitter } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import "../css/Sidebar.css"
import SidebarOption from './SidebarOption'

export default function Sidebar() {
  return (
    <div className='sidebar'>
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
    </div>

  )
}
