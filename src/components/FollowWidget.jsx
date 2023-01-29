import { Verified } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import "../css/FollowWidget.css";
import ShowMore from "./ShowMore";

export default function FollowWidget() {
  return (
    <div className="follow__widget">
      <h2 className="follow__title">Who To Follow</h2>
      <div className="follow__user">
        <div className="follow__pfp">
          <Avatar src="https://pbs.twimg.com/profile_images/1082170661856890884/UA8DEgjO_400x400.jpg" />
        </div>
        <div className="follow__nameContainer">
          <div className="follow__name">
            <h4 className="profile__name">
              Kobe Bryant <Verified className="follow__userBadge" />
            </h4>
            <h4 className="profile__username">@kobebryant</h4>
          </div>
          <Button className="follow__button">Follow</Button>
        </div>
      </div>
      <div className="follow__user">
        <div className="follow__pfp">
          <Avatar src="https://pbs.twimg.com/profile_images/1339164988284473346/vvFFK-Ki_400x400.jpg" />
        </div>
        <div className="follow__nameContainer">
          <div className="follow__name">
            <h4 className="profile__name">
              Pagani Automobili <Verified className="follow__businessBadge" />
            </h4>
            <h4 className="profile__username">@OfficialPagani</h4>
          </div>
          <Button className="follow__button">Follow</Button>
        </div>
      </div>
      <div className="follow__user">
        <div className="follow__pfp">
          <Avatar src="https://pbs.twimg.com/profile_images/1595447220089720832/4R68RXvh_400x400.jpg" />
        </div>
        <div className="follow__nameContainer">
          <div className="follow__name">
            <h4 className="profile__name">
              The Last Of Us <Verified className="follow__businessBadge" />
            </h4>
            <h4 className="profile__username">@TheLastOfUsHBO</h4>
          </div>
          <Button className="follow__button">Follow</Button>
        </div>
      </div>
      <ShowMore />
    </div>
  );
}
