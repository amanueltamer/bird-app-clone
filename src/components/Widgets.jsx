import { MoreHoriz, Search } from '@mui/icons-material'
import React from 'react'
import "../css/Widgets.css"
import CurrentEvents from './CurrentEvents'
import ShowMore from './ShowMore'
import FollowWidget from './FollowWidget'

export default function Widgets() {
  return (
    <div className='widgets'>
      <div className="widgets__input">
        <Search className='widgets__searchIcon'/>
        <input placeholder='Search Twitter' type="text" />
      </div>

        <CurrentEvents />
        <div className="current__event">
          <div className="current__eventContainer">
          <h3 className='current__eventInfo'>Tennis Tournament · LIVE</h3>
          <MoreHoriz className='more__icon'/>
          </div>
          <h2 className='current__eventTitle'>Australian Open 2023</h2>
        </div>

        <div className="current__event">
          <div className="current__eventContainer">
          <h3 className='current__eventInfo'>Entertainment · Trending</h3>
          <MoreHoriz className='more__icon'/>
          </div>
          <h2 className='current__eventTitle'>Lauren London</h2>
        </div>

        <div className="current__event">
          <div className="current__eventContainer">
          <h3 className='current__eventInfo'>Trending in United States</h3>
          <MoreHoriz className='more__icon'/>
          </div>
          <h2 className='current__eventTitle'>Booster Gold</h2>
        </div>

        <div className="current__event">
          <div className="current__eventContainer">
          <h3 className='current__eventInfo'>Trending in United States</h3>
          <MoreHoriz className='more__icon'/>
          </div>
          <h2 className='current__eventTitle'>#TB12</h2>
        </div>

        <div className="current__event">
          <div className="current__eventContainer">
          <h3 className='current__eventInfo'>Trending in United States</h3>
          <MoreHoriz className='more__icon'/>
          </div>
          <h2 className='current__eventTitle'>#HitMeWithYour</h2>
        </div>
        <ShowMore />

        <FollowWidget />

        <h3 className="widgets__credits">Twitter clone made by Amanuel Tamer - 2023</h3>
    </div>
  )
}
